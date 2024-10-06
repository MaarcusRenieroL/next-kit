import { CLIOptions, DatabaseProvider, PkgInstallerMap } from "@/types/global.js";
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js";
import path from "path";
import { installPackages } from "./install-packages.js";
import { scaffoldProject } from "./setup-base-project.js";

type CreateProjectOptions = CLIOptions & {
  packages: PkgInstallerMap;
  databaseProvider: DatabaseProvider;
};

export const createProject = async ({ packages, databaseProvider, ...options }: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), options.targetDir ? options.targetDir + "/" + options.projectName : options.projectName);

  // Setup the base Next.js application
  await scaffoldProject({
    ...options,
  });

  // Install the selected packages
  installPackages({
    ...options,
    projectDir,
    packageManager: options.packageManager || pkgManager,
    packages,
    databaseProvider,
  });

  return projectDir;
};
