import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import path from "path";

export const eslintInstaller: Installer = ({ targetDir, projectName, database: databaseProvider }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;
  if (!projectDir) {
    throw new Error("Project directory is required");
  }
  addPackageDependency({
    projectDir,
    dependencies: ["prisma"],
    devMode: true,
  });
  addPackageDependency({
    projectDir,
    dependencies: ["@prisma/client"],
    devMode: false,
  });


};
