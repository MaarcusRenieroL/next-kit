import { createProject } from "@/helpers/create-project.js";
import { buildPkgInstallerMap } from "@/installers/index.js";
import { input, select } from "@inquirer/prompts";
import chalk from "chalk";
import { AvailablePackages, CLIOptions, PackageManager, PackageManagerX } from "../types/global.js";
import { exit, printSuccessMessage } from "../utils/message.js";
import { setImportAlias } from "@/helpers/set-import-alias.js";
import path from "path";
import { removeTsNoCheck } from "@/helpers/remove-ts-no-check.js";
import fs from "fs-extra";
import ora from "ora";
import { execSync } from "child_process";
import { PackageJson } from "type-fest";

const packageManagerXMap: Record<PackageManager, PackageManagerX> = {
  yarn: "yarn",
  npm: "npx",
  pnpm: "pnpx",
  bun: "bunx",
};

// Helper to handle common input logic
async function getInput<T extends any | boolean>(message: string, choices?: { name: string; value: T }[], defaultValue?: T): Promise<T> {
  if (choices) {
    return await select({ message, choices, default: defaultValue });
  } else {
    return (await input({
      message,
      default: String(defaultValue),
      validate: (value: string) => (value && value.trim() ? true : `${message} cannot be empty!`),
    })) as T;
  }
}

export async function init(options: CLIOptions) {
  try {
    options.projectName ??= await getInput("What is your project name? ›", undefined, "cli-app");
    options.targetDir ??= await getInput("Where do you want to create the project? (path) ›", undefined, process.cwd());

    options.eslint ??= await getInput(
      `Would you like to ${chalk.blueBright("ESLint")}? ›`,
      [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
      true
    );

    options.tailwind ??= await getInput(
      `Would you like to ${chalk.blueBright("Tailwind CSS")}? ›`,
      [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
      true
    );

    options.scopedAppName ??= await getInput(
      `Would you like to ${chalk.blueBright("`src/` directory")}? ›`,
      [
        { name: "Yes", value: "src" },
        { name: "No", value: "app" },
      ],
      "src"
    );

    options.alias ??= await getInput("What alias pattern would you like to use? ›", undefined, "@/*");

    options.packageManager ??= await getInput("Which package manager would you like to use? ›", [
      { name: "Npm", value: "npm" },
      { name: "Yarn", value: "yarn" },
      { name: "Pnpm", value: "pnpm" },
      { name: "Bun", value: "bun" },
    ]);

    options.packageManagerX ??= packageManagerXMap[options.packageManager];

    options.uiLibrary ??= await getInput(
      "Which UI library would you like to use? ›",
      [
        { name: "No UI Library", value: "none" },
        { name: "ShadCN UI", value: "shadcn-ui" },
        { name: "Radix UI", value: "radix-ui" },
        { name: "Chakra UI", value: "chakra-ui" },
      ],
      "shadcn-ui"
    );

    options.database ??= await getInput(
      "Which database would you like to use? ›",
      [
        { name: "PostgreSQL", value: "postgresql" },
        { name: "MongoDB", value: "mongodb" },
        { name: "MySQL", value: "mysql" },
        { name: "SQLite", value: "sqlite" },
        { name: "No Database", value: "none" },
      ],
      "postgresql"
    );

    if (options.database !== "none") {
      options.orm ??= await getInput(
        "Which ORM would you like to use? ›",
        [
          { name: "Prisma", value: "prisma" },
          { name: "Drizzle", value: "drizzle" },
          { name: "No ORM", value: "none" },
        ],
        "prisma"
      );

      options.auth ??= await getInput(
        "Which authentication package would you like to use? ›",
        [
          { name: "Next Auth", value: "next-auth" },
          { name: "Clerk", value: "clerk" },
          { name: "Kinde", value: "kinde" },
          { name: "Lucia", value: "lucia" },
          { name: "No Authentication", value: "none" },
        ],
        "next-auth"
      );

      options.payment ??= await getInput("Which payment service would you like to use? ›", [
        { name: "No Payment Service", value: "none" },
        { name: "Stripe", value: "stripe" },
        { name: "Paypal", value: "paypal" },
        { name: "Lemon Squeezy", value: "lemon-squeezy" },
        { name: "Razorpay", value: "razorpay" },
      ]);
    } else {
      options.auth ??= await getInput("Which authentication package would you like to use? ›", [
        { name: "No Authentication", value: "none" },
        { name: "Clerk", value: "clerk" },
        { name: "Kinde", value: "kinde" },
        { name: "Lucia", value: "lucia" },
      ]);
    }

    options.api ??= await getInput("How do you want to write your APIs", [
      { name: "Hono", value: "hono" },
      { name: "tRPC", value: "trpc" },
      { name: "Rest API", value: "rest" },
      { name: "GraphQL", value: "graphql" },
      { name: "No APIs", value: "none" },
    ]);

    options.analytics ??= await getInput("Which analytics service would you like to use? ›", [
      { name: "No Analytics", value: "none" },
      { name: "Vercel Analytics", value: "vercel-analytics" },
      { name: "Google Analytics", value: "google-analytics" },
    ]);

    options.empty ??= await getInput("Would you like to generate an empty project structure? ›", [
      { name: "No", value: false },
      { name: "Yes", value: true },
    ]);

    options.skipInstall ??= await getInput(`Would you like to skip running ${options.packageManager} install? ›`, [
      { name: "No", value: false },
      { name: "Yes", value: true },
    ]);

    // setup the project
    options.projectDir = options.targetDir ? path.join(options.targetDir, options.projectName) : options.projectName;

    if (options.database !== "none") {
      const packages: AvailablePackages[] = [];
      if (options.orm === "prisma") packages.push("prisma");
      if (options.tailwind) packages.push("tailwind");

      switch (options.api) {
        case "hono":
          packages.push("hono");
          break;
        case "trpc":
          packages.push("trpc");
          break;
        case "rest":
          packages.push("rest-api");
          break;
        default:
          break;
      }

      switch (options.auth) {
        case "clerk":
          packages.push("clerk");
          break;
        case "kinde":
          packages.push("kinde");
          break;
      }

      const usePackages = buildPkgInstallerMap(packages, options.database);

      await createProject({ ...options, databaseProvider: options.database, packages: usePackages });

      // update import alias in any generated files if not using the default
      if (options.alias !== "@/*") {
        setImportAlias(options.projectDir, options.alias);
      }
    }
    removeTsNoCheck(options.projectDir);

    if (!options.skipInstall) {
      const packageJsonPath = path.join(options.projectDir, "package.json");
      const packageJsonContents = fs.readJSONSync(packageJsonPath) as PackageJson;

      const dependencies = packageJsonContents.dependencies;
      const devDependencies = packageJsonContents.devDependencies;

      const getInstallCommand = (pkgManager: string, pkg: string, isDev: boolean) => {
        switch (pkgManager) {
          case "npm":
            return `npm install ${isDev ? "--save-dev" : ""} ${pkg}`;
          case "yarn":
            return `yarn add ${isDev ? "--dev" : ""} ${pkg}`;
          case "pnpm":
            return `pnpm add ${isDev ? "--save-dev" : ""} ${pkg}`;
          case "bun":
            return `bun add ${pkg} ${isDev ? "--dev" : ""}`;
          default:
            throw new Error(`Unsupported package manager: ${pkgManager}`);
        }
      };
      console.log(`\nInstalling dependencies...`);
      if (dependencies) {
        Object.entries(dependencies).forEach(([pkgName, version]) => {
          const pkg = `${pkgName}@${version}`;
          const spinner = ora(`Installing package: ${chalk.cyan(pkg)}...`).start();

          try {
            const command = getInstallCommand(options.packageManager, pkg, false);
            execSync(command, { stdio: "ignore", cwd: options.projectDir });
            spinner.succeed(`${chalk.green("Successfully installed")} ${chalk.cyan(pkg)}`);
          } catch (error) {
            spinner.fail(`${chalk.red("Failed to install")} ${chalk.cyan(pkg)}`);
            console.error(error);
          }
        });
      }

      console.log(`\nInstalling dev dependencies...`);

      if (devDependencies) {
        Object.entries(devDependencies).forEach(([pkgName, version]) => {
          const pkg = `${pkgName}@${version}`;
          const spinner = ora(`Installing package: ${chalk.cyan(pkg)}...`).start();

          try {
            const command = getInstallCommand(options.packageManager, pkg, true);
            execSync(command, { stdio: "ignore", cwd: options.projectDir });
            spinner.succeed(`${chalk.green("Successfully installed")} ${chalk.cyan(pkg)}`);
          } catch (error) {
            spinner.fail(`${chalk.red("Failed to install")} ${chalk.cyan(pkg)}`);
            console.error(error);
          }
        });
      }
    }

    printSuccessMessage(options.packageManager, options.projectName);
  } catch (error) {
    console.log(error);
    exit();
  }
}
