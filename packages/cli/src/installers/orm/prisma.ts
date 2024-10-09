import { PKG_ROOT } from "@/constants/index.js";
import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";
import { type PackageJson } from "type-fest";

export const prismaInstaller: Installer = ({ targetDir, projectName, scopedAppName, database: databaseProvider }) => {
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

  switch (databaseProvider) {
    case "mysql":
      addPackageDependency({
        projectDir,
        dependencies: ["@prisma/adapter-planetscale", "@planetscale/database"],
        devMode: false,
      });

      break;
    case "postgresql":
      addPackageDependency({
        projectDir,
        dependencies: ["@prisma/adapter-planetscale", "@planetscale/database"],
        devMode: false,
      });
      break;
  }

  const extrasDir = path.join(PKG_ROOT, "template/extras/orm");
  const schemaSrc = path.join(extrasDir, "prisma/schema", `base.prisma`);
  let schemaText = fs.readFileSync(schemaSrc, "utf-8");

  const schemaDest = path.join(projectDir, "prisma/schema.prisma");
  fs.mkdirSync(path.dirname(schemaDest), { recursive: true });
  fs.writeFileSync(schemaDest, schemaText);

  const clientSrc = path.join(extrasDir, "prisma/db-prisma.ts");
  const clientDest = path.join(projectDir, scopedAppName === "src" ? "src" : "", "server/db/index.ts");

  // add postinstall and push script to package.json
  const packageJsonPath = path.join(projectDir, "package.json");

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    postinstall: "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma migrate dev",
    "db:migrate": "prisma migrate deploy",
  };

  fs.copySync(clientSrc, clientDest);
  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });
};
