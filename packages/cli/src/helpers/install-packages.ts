import { CLIOptions, DatabaseProvider, PkgInstallerMap } from "@/types/global.js";
import { logger } from "@/utils/logger.js";
import chalk from "chalk";
import ora from "ora";

type InstallPackagesOptions = CLIOptions & {
  packages: PkgInstallerMap;
  projectDir: string;
  databaseProvider: DatabaseProvider;
};
// This runs the installer for all the packages that the user has selected
export const installPackages = async (options: InstallPackagesOptions) => {
  const { packages } = options;
  logger.info("Adding boilerplate...");

  for (const [name, pkgOpts] of Object.entries(packages)) {
    if (pkgOpts.inUse) {
      const spinner = ora(`Boilerplating ${name}...`).start();
      // some installers are async (e.g. analytics installers that format with
      // prettier); await so the spinner and subsequent steps don't race ahead.
      await pkgOpts.installer(options);
      spinner.succeed(chalk.green(`Successfully setup boilerplate for ${chalk.green.bold(name)}`));
    }
  }
  logger.info("Packages installed");
};
