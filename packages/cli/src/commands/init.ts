import { createProject } from "@/helpers/create-project.js";
import { buildPkgInstallerMap } from "@/installers/index.js";
import { input, select } from "@inquirer/prompts";
import chalk from "chalk";
import { AvailablePackages, CLIOptions, DatabaseProvider, PackageManager, PackageManagerX } from "../types/global.js";
import { exit, printSuccessMessage } from "../utils/message.js";
import { setImportAlias } from "@/helpers/set-import-alias.js";
import path from "path";
import { removeTsNoCheck } from "@/helpers/remove-ts-no-check.js";
import fs from "fs-extra";
import ora from "ora";
import { execSync } from "child_process";
import { PackageJson } from "type-fest";
import { getInstallCommand } from "@/utils/index.js";
import { logger } from "@/utils/logger.js";

const packageManagerXMap: Record<PackageManager, PackageManagerX> = {
  yarn: "yarn",
  npm: "npx",
  pnpm: "pnpx",
  bun: "bunx",
};

// Helper to handle common input logic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      ]);
    }

    options.email ??= await getInput(
      "Which email package would you like to use? ›",
      [
        { name: "Resend", value: "resend" },
        { name: "Mailgun", value: "mailgun" },
        { name: "Sendgrid", value: "sendgrid" },
        { name: "Postmark", value: "postmark" },
        { name: "No Email Package", value: "none" },
      ],
      "resend"
    );

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

    const packages: AvailablePackages[] = [];

    if (options.eslint) packages.push("eslint");
    if (options.tailwind) packages.push("tailwind");

    if (options.database !== "none") {
      switch (options.orm) {
        case "prisma":
          packages.push("prisma");
          break;
        case "drizzle":
          packages.push("drizzle");
          break;
        default:
          break;
      }
    }

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
      case "graphql":
        packages.push("graphql");
        break;
      default:
        break;
    }

    switch (options.auth) {
      case "next-auth":
        packages.push("next-auth");
        break;
      case "clerk":
        packages.push("clerk");
        break;
      case "kinde":
        packages.push("kinde");
        break;
      default:
        break;
    }

    switch (options.email) {
      case "resend":
        packages.push("resend");
        break;
      case "sendgrid":
        packages.push("sendgrid");
        break;
      case "mailgun":
        packages.push("mailgun");
        break;
      case "postmark":
        packages.push("postmark");
        break;
      default:
        break;
    }

    switch (options.payment) {
      case "stripe":
        packages.push("stripe");
        break;
      case "paypal":
        packages.push("paypal");
        break;
      case "lemon-squeezy":
        packages.push("lemon-squeezy");
        break;
      case "razorpay":
        packages.push("razorpay");
        break;
      default:
        break;
    }

    switch (options.analytics) {
      case "vercel-analytics":
        packages.push("vercel-analytics");
        break;
      case "google-analytics":
        packages.push("google-analytics");
        break;
      default:
        break;
    }

    const usePackages = buildPkgInstallerMap(packages);

    const databaseProvider: DatabaseProvider = options.database && options.database !== "none" ? options.database : "postgresql";

    // always scaffold the project, regardless of whether a database was chosen
    await createProject({ ...options, databaseProvider, packages: usePackages, packageList: packages });

    // update import alias in any generated files if not using the default
    if (options.alias !== "@/*") {
      setImportAlias(options.projectDir, options.alias);
    }

    removeTsNoCheck(options.projectDir);

    if (!options.skipInstall) {
      const packageJsonPath = path.join(options.projectDir, "package.json");
      const packageJsonContents = fs.readJSONSync(packageJsonPath) as PackageJson;

      const dependencies = packageJsonContents.dependencies || {};
      const devDependencies = packageJsonContents.devDependencies || {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const installPackages = (pkgList: any, isDev = false) => {
        const spinner = ora(isDev ? "Installing dev dependencies..." : "Installing dependencies...").start();

        try {
          const commands = pkgList.map(([pkgName, version]: [pkgName: string, version: string]) => {
            const pkg = `${pkgName}@${version}`;
            return getInstallCommand(options.packageManager, pkg, isDev);
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          commands.forEach((command: any) => {
            execSync(command, { stdio: "ignore", cwd: options.projectDir });
          });

          spinner.succeed(`${chalk.green("Successfully installed")} ${isDev ? "dev dependencies" : "dependencies"}`);
        } catch (error) {
          console.log(error);
          spinner.fail(`${chalk.red("Failed to install")} ${isDev ? "dev dependencies" : "dependencies"}`);
        }
      };

      console.log("\n");
      installPackages(Object.entries(dependencies));

      console.log("\n");
      installPackages(Object.entries(devDependencies), true);

      logger.info("Packages installed successfully");
    }

    printSuccessMessage(options.packageManager, options.projectName);
  } catch (error) {
    console.log(error);
    exit();
  }
}
