import { mkdirSync } from "fs";

import { input, select } from "@inquirer/prompts";

import { CLIOptions } from "../types";
import { exit, printSuccessMessage } from "../utils/message";
import {
  getInitCommand,
  getPackageList,
  installPackages,
  addPackages,
} from "../utils";
import { createNextApp } from "../packages/next";
import { chdir } from "process";
import { createAPIs } from "../packages/api";
import { execSync } from "child_process";
import { createORMs } from "../packages/orm";

export async function init(options: CLIOptions) {
  let projectPath = "";

  if (!options.projectName) {
    try {
      options.projectName = await input({
        message: "What is your project name? ›",
        default: "cli-app",
        validate: (name: string) => {
          if (name && name.trim()) return true;
          return "Project name cannot be empty!";
        },
      });
    } catch (error) {
      exit();
    }
  }

  if (!options.targetDir) {
    try {
      options.targetDir = await input({
        message: "Where do you want to create the project? (path) ›",
        default: process.cwd(),
      });

      projectPath = `${options.targetDir}/${options.projectName}`;
    } catch (error) {
      exit();
    }
  }

  if (options.empty === undefined) {
    options.empty = await select({
      message: "Would you like to generate an empty project structure? ›",
      choices: [
        { name: "No", value: false },
        { name: "Yes", value: true },
      ],
    });
  }

  if (!options.uiLibrary) {
    try {
      options.uiLibrary = await select({
        message: "Which UI library would you like to use? ›",
        choices: [
          { name: "No UI Library", value: "none" },
          { name: "ShadCN UI", value: "shadcn-ui" },
          { name: "Radix UI", value: "radix-ui" },
          { name: "Chakra UI", value: "chakra-ui" },
        ],
      });
    } catch (error) {
      exit();
    }
  }

  if (options.tailwind === undefined) {
    options.tailwind = await select({
      message: "Do you want to include Tailwind CSS? ›",
      choices: [
        { name: "No", value: false },
        { name: "Yes", value: true },
      ],
    });
  }

  if (options.eslint === undefined) {
    options.eslint = await select({
      message: "Would you like to disable ESLint? ›",
      choices: [
        { name: "No", value: false },
        { name: "Yes", value: true },
      ],
    });
  }

  if (!options.alias) {
    try {
      options.alias = await input({
        message: "What alias pattern would you like to use? ›",
        default: "@/*",
      });
    } catch (error) {
      exit();
    }
  }

  if (!options.database) {
    try {
      options.database = await select({
        message: "Which database would you like to use? ›",
        choices: [
          { name: "No Database", value: "none" },
          { name: "PostgreSQL", value: "postgresql" },
          { name: "MongoDB", value: "mongodb" },
          { name: "MySQL", value: "mysql" },
          { name: "SQLite", value: "sqlite" },
        ],
      });
    } catch (error) {
      exit();
    }
  }

  if (options.database !== "none" && !options.orm) {
    try {
      options.orm = await select({
        message: "Which ORM would you like to use? ›",
        choices: [
          { name: "No ORM", value: "none" },
          { name: "Prisma", value: "prisma" },
          { name: "Drizzle", value: "drizzle" },
        ],
      });
    } catch (error) {
      exit();
    }
  }

  if (!options.auth) {
    try {
      options.auth = await select({
        message: "Which authentication package would you like to use? ›",
        choices: [
          { name: "No Authentication", value: "none" },
          { name: "Next Auth", value: "next-auth" },
          { name: "Clerk", value: "clerk" },
          { name: "Kinde", value: "kinde" },
          { name: "Lucia", value: "lucia" },
        ],
      });
    } catch (error) {
      exit();
    }
  }

  if (!options.api) {
    try {
      options.api = await select({
        message: "How do you want to write your APIs? ›",
        choices: [
          { name: "No APIs", value: "none" },
          { name: "Rest API", value: "rest" },
          { name: "Hono", value: "hono" },
          { name: "tRPC", value: "trpc" },
          { name: "GraphQL", value: "graphql" },
        ],
      });
    } catch (error) {
      exit();
    }
  }

  if (!options.analytics) {
    try {
      options.analytics = await select({
        message: "Which analytics service would you like to use? ›",
        choices: [
          { name: "No Analytics", value: "none" },
          { name: "Vercel Analytics", value: "vercel-analytics" },
          { name: "Google Analytics", value: "google-analytics" },
        ],
      });
    } catch (error) {
      exit();
    }
  }

  if (!options.payment) {
    try {
      options.payment = await select({
        message: "Which payment service would you like to use? ›",
        choices: [
          { name: "No Payment Service", value: "none" },
          { name: "Stripe", value: "stripe" },
          { name: "Paypal", value: "paypal" },
          { name: "Lemon Squeezy", value: "lemon-squeezy" },
          { name: "Razorpay", value: "razorpay" },
        ],
      });
    } catch (error) {
      exit();
    }
  }

  if (!options.packageManager) {
    try {
      options.packageManager = await select({
        message: "Which package manager would you like to use? ›",
        choices: [
          { name: "Npm", value: "npm" },
          { name: "Yarn", value: "yarn" },
          { name: "Pnpm", value: "pnpm" },
          { name: "Bun", value: "bun" },
        ],
      });
    } catch (error) {
      exit();
    }
  }

  if (options.skipInstall === undefined) {
    options.skipInstall = await select({
      message: "Would you like to skip running `npm install`? ›",
      choices: [
        { name: "No", value: false },
        { name: "Yes", value: true },
      ],
    });
  }

  const packages = getPackageList(options);

  if (packages.dependencies.length > 0 && packages.devDependencies.length > 0) {
    try {
      mkdirSync(projectPath);

      const targetDir = `${options.targetDir}/${options.projectName}`;

      chdir(targetDir);

      console.log("Initializing node...");
      execSync(getInitCommand(options.packageManager), { stdio: "ignore" });

      if (!options.skipInstall) {
        console.log(
          `Installing dependencies: ${packages.dependencies.join(", ")}`,
        );
        await installPackages(
          packages.dependencies,
          options.packageManager,
          false,
        );

        console.log(
          `Installing dev dependencies: ${packages.devDependencies.join(", ")}`,
        );
        await installPackages(
          packages.devDependencies,
          options.packageManager,
          true,
        );
      }

      await addPackages(packages);

      await createNextApp(options);

      if (options.api) {
        await createAPIs(options);
      }

      if (options.orm) {
        await createORMs(options);
      }
    } catch (error) {
      console.error("Failed to install packages:", error);
      exit();
    }
  }

  printSuccessMessage(
    options.projectName,
    options.targetDir + "/" + options.projectName,
  );
}
