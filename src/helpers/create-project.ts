import { CLIOptions, DatabaseProvider, PkgInstallerMap } from "@/types/global.js";
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js";
import path from "path";
import { installPackages } from "./install-packages.js";
import { scaffoldProject } from "./setup-base-project.js";
import { selectLayoutFile, selectPageFile, selectProviderFile } from "./generate-boilerplate.js";

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
  selectLayoutFile({
    ...options,
    packages,
    projectDir: projectDir,
  });
  selectPageFile({
    ...options,
    packages,
    projectDir: projectDir,
  });

  selectProviderFile({
    ...options,
    packages,
    projectDir: projectDir,
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
