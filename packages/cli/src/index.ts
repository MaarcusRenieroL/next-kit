#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init.js";
import { logger } from "./utils/logger.js";
import { printIntroMessage } from "./utils/message.js";

const handleExit = (error: unknown) => {
  if (error instanceof Error && error.message.includes("User force closed the prompt")) {
    logger.info("\nPrompt closed. Exiting CLI.");
    process.exit(0);
  }

  logger.error("An unexpected error occurred:");
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error(String(error));
  }
  process.exit(1);
};

const main = async () => {
  const program = new Command();
  program.name("CLI").description("A CLI to get started with your next Next.js Project").version("1.0.0");

  printIntroMessage();

  program
    .arguments("[project-name]")
    .description("Default: Initialize a new project")
    .action(async (projectName, options) => {
      try {
        await init({ ...options, projectName });
      } catch (error) {
        handleExit(error);
      }
    });

  program.parse(process.argv);
};

main().catch((err) => {
  logger.info("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error("An unknown error has occurred. Please open an issue on github with the below:");
    console.log(err);
  }
  process.exit(1);
});
