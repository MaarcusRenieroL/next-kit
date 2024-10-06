import { confirm, select } from "@inquirer/prompts";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

import { PKG_ROOT } from "@/constants/index.js";
import { CLIOptions } from "@/types/global.js";

// This bootstraps the base Next.js application
export const scaffoldProject = async ({ projectName, targetDir }: CLIOptions) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;
  const srcDir = path.join(PKG_ROOT, "template/base");

  const spinner = ora(`Scaffolding in: ${projectDir}...\n`).start();

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      if (projectName !== ".") spinner.info(`${chalk.cyan.bold(projectName)} exists but is empty, continuing...\n`);
    } else {
      spinner.stopAndPersist();
      const overwriteDir = await select({
        message: `${chalk.redBright.bold("Warning:")} ${chalk.cyan.bold(projectName)} already exists and isn't empty. How would you like to proceed?`,
        choices: [
          {
            name: "Abort installation (recommended)",
            value: "abort",
          },
          {
            name: "Clear the directory and continue installation",
            value: "clear",
          },
          {
            name: "Continue installation and overwrite conflicting files",
            value: "overwrite",
          },
        ],
        default: "abort",
      });
      if (overwriteDir === "abort") {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      const overwriteAction = overwriteDir === "clear" ? "clear the directory" : "overwrite conflicting files";

      const confirmOverwriteDir = await confirm({
        message: `Are you sure you want to ${overwriteAction}?`,
        default: false,
      });

      if (!confirmOverwriteDir) {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      if (overwriteDir === "clear") {
        spinner.info(`Emptying ${chalk.cyan.bold(projectName)} and creating next-cli app..\n`);
        fs.emptyDirSync(projectDir);
      }
    }
  }

  spinner.start();

  const nextConfigPath = path.join(srcDir, "next.config.js");
  let nextConfigContent = fs.readFileSync(nextConfigPath, "utf8");
  nextConfigContent = nextConfigContent.replace(/\/\/ @ts-nocheck\r?\n/, "");

  fs.copySync(srcDir, projectDir);
  fs.renameSync(path.join(projectDir, "_gitignore"), path.join(projectDir, ".gitignore"));
  fs.writeFileSync(path.join(projectDir, "next.config.js"), nextConfigContent);

  const scaffoldedName = projectName === "." ? "App" : chalk.cyan.bold(projectName);

  spinner.succeed(`${scaffoldedName} ${chalk.green("scaffolded successfully!")}\n`);
};
