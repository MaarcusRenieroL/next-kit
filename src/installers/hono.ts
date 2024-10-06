import fs from "fs-extra";
import path from "path";
import { type PackageJson } from "type-fest";
import { PKG_ROOT } from "@/constants/index.js";
import { CLIOptions } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";

export type Installer = (opts: CLIOptions) => void;

export const honoInstaller: Installer = ({ targetDir, projectName }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  // Add Hono dependencies
  addPackageDependency({
    projectDir,
    dependencies: ["hono", "@hono/zod-validator"],
    devMode: false,
  });

  // Copy Hono-specific files
  const extrasDir = path.join(PKG_ROOT, "template/extras");
  const honoSrc = path.join(extrasDir, "hono/server");
  const honoDest = path.join(projectDir, "src/server");
  fs.copySync(honoSrc, honoDest);

  // route handler copy
  const honoApiSrc = path.join(extrasDir, "hono/api/index.ts");
  let apiRouteContent = fs.readFileSync(honoApiSrc, "utf-8");

  const honoApiDest = path.join(projectDir, "src/app/api/[[...route]]/route.ts");
  fs.mkdirSync(path.dirname(honoApiDest), { recursive: true });
  fs.writeFileSync(honoApiDest, apiRouteContent);
};
