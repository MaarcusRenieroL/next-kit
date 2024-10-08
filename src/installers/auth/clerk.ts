import { PKG_ROOT } from "@/constants/index.js";
import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";


export const clerkInstaller: Installer = ({ targetDir, projectName, scopedAppName }) => {
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

  // Copy Clerk-specific files
  const extrasDir = path.join(PKG_ROOT, "template/extras/auth");
  const clerkSrc = path.join(extrasDir, "clerk");
  const clerkDest = path.join(projectDir, scopedAppName === "src" ? "src" : "");
  fs.copySync(clerkSrc, clerkDest);

  const envContents = `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_SECRET_KEY`;

  fs.writeFileSync(`${projectDir}/.env`, envContents)
}