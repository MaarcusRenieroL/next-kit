import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import path from "path";
import { _initialConfig } from "@/../template/extras/config/_eslint.js";
import fs from "fs-extra";
export const eslintInstaller: Installer = ({ targetDir, projectName }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;
  if (!projectDir) {
    throw new Error("Project directory is required");
  }
  addPackageDependency({
    projectDir,
    dependencies: ["eslint", "eslint-config-next", "eslint-config-prettier"],
    devMode: true,
  });
  const eslintConfig = _initialConfig;

  const eslintConfigDest = path.join(projectDir, ".eslintrc.json");
  fs.writeFileSync(eslintConfigDest, JSON.stringify(eslintConfig, null, 2), "utf-8");
};
