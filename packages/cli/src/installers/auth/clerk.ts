import { PKG_ROOT } from "@/constants/index.js";
import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import { existsSync } from "fs";
import fs from "fs-extra";
import path from "path";

export const clerkInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  // Add Clerk dependencies
  addPackageDependency({
    projectDir,
    dependencies: ["@clerk/nextjs"],
    devMode: false,
  });

  if (!empty) {
    // Copy Clerk-specific files
    const extrasDir = path.join(PKG_ROOT, "template/extras");
    const clerkSrc = path.join(extrasDir, "auth/clerk");
    const clerkDest = path.join(projectDir, scopedAppName === "src" ? "src" : "");
    fs.copySync(clerkSrc, clerkDest, { overwrite: false });

    // below is the provider path in generated app
    const providerIndexPathInDest = path.join(clerkDest, "providers/index.tsx");

    if (existsSync(providerIndexPathInDest)) {
      const ProviderContent = fs.readFileSync(providerIndexPathInDest, "utf-8");
      const updatedContent = ProviderContent.replace(
        "{children}",
        `
      <ClerkProvider>
        {children}
      </ClerkProvider>
      `
      );
      fs.writeFileSync(providerIndexPathInDest, 'import { ClerkProvider } from "@/providers/clerk-provider"\n' + updatedContent, "utf-8");
    }

    const envContents = `
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
  CLERK_SECRET_KEY=YOUR_SECRET_KEY`;

    fs.appendFileSync(`${projectDir}/.env`, envContents);
  }
};
