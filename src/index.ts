#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init.js";
import { logger } from "./utils/logger.js";
import { printIntroMessage } from "./utils/message.js";

const main = async () => {
  const program = new Command();
  program.name("CLI").description("A CLI to get started with your next Next.js Project").version("1.0.0");

  printIntroMessage();

  program
    .arguments("[project-name]")
    .description("Default: Initialize a new project")
    .action(async (projectName, options) => {
      await init({ ...options, projectName });
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
