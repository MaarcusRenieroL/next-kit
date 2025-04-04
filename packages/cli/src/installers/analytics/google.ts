import { removeTsNoCheckCommentFromContent } from "@/helpers/remove-ts-no-check.js";
import { Installer } from "@/types/global.js";
import fs from "fs-extra";
import path from "path";
import prettier from "prettier";

export const googleAnalyticsInstaller: Installer = async ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  if (!empty) {
    // Define the layout file path (assuming a common Next.js structure)
    const layoutFilePath = path.join(projectDir, scopedAppName === "src" ? "src" : "", "app/layout.tsx");

    // Read existing layout content
    let layoutContent = fs.readFileSync(layoutFilePath, "utf-8");

    // Add import if not already present
    if (!layoutContent.includes(`import { GoogleAnalytics } from '@next/third-parties/google'`)) {
      layoutContent = `import { GoogleAnalytics } from '@next/third-parties/google'\n${layoutContent}`;
    }

    // Add Analytics component before closing body tag if not already present
    if (!layoutContent.includes(`<GoogleAnalytics gaId="G-XYZ" />`)) {
      layoutContent = layoutContent.replace("</body>", `</body>\n<GoogleAnalytics gaId="G-XYZ" />`);
    }

    layoutContent = removeTsNoCheckCommentFromContent(layoutContent);
    // Format the content with Prettier
    layoutContent = await prettier.format(layoutContent, {
      parser: "typescript", // Use "typescript" parser for TSX files
      singleQuote: false,
      tabWidth: 2,
      trailingComma: "es5",
    });

    // Write the modified content back
    fs.writeFileSync(layoutFilePath, layoutContent);
  }
};
