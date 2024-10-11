import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import path from "path";
<<<<<<< HEAD
import { _initialConfig } from "@/../template/extras/config/_eslint.js";
import fs from "fs-extra";
export const eslintInstaller: Installer = ({ targetDir, projectName, orm, database: databaseProvider }) => {
=======

export const eslintInstaller: Installer = ({ targetDir, projectName }) => {
>>>>>>> b4ded0ecfa80173630df4c196a866d4e0d413a87
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;
  if (!projectDir) {
    throw new Error("Project directory is required");
  }
  addPackageDependency({
    projectDir,
    dependencies: ["eslint", "eslint-config-next", "eslint-config-prettier", "eslint-plugin-check-file", "eslint-plugin-n"],
    devMode: true,
  });
<<<<<<< HEAD
  if (orm === "drizzle") {
    addPackageDependency({
      projectDir,
      dependencies: ["eslint-plugin-drizzle"],
      devMode: true,
    });
  }
  const eslintConfig = _initialConfig;

  const eslintConfigDest = path.join(projectDir, ".eslintrc.json");
  fs.writeFileSync(eslintConfigDest, JSON.stringify(eslintConfig, null, 2), "utf-8");
=======
  addPackageDependency({
    projectDir,
    dependencies: ["@prisma/client"],
    devMode: false,
  });
>>>>>>> b4ded0ecfa80173630df4c196a866d4e0d413a87
};
