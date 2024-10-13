import { PKG_ROOT } from "@/constants/index.js";
import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";

export const resendInstaller: Installer = ({ targetDir, projectName, scopedAppName }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project Directory is required");
  }

  addPackageDependency({ projectDir, dependencies: ["resend"], devMode: false });

  const extrasDir = path.join(PKG_ROOT, "template/extras");
  const resendSrc = path.join(extrasDir, "email/resend");

  const resendDest = path.join(projectDir, scopedAppName === "src" ? "src" : "");

  fs.copySync(resendSrc, resendDest, { overwrite: false });

  fs.appendFileSync(`${projectDir}/.env`, "\n\nRESEND_API_KEY=YOUR_RESEND_API_KEY");
};
