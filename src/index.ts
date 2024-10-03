#!/usr/bin/env node

import { printIntroMessage } from "./utils/message";
import { Command } from "commander";
import { init } from "./commands";

const program = new Command();
program
  .name("CLI")
  .description("A CLI to get started with your next Next.js Project")
  .version("1.0.0");

printIntroMessage();

program
  .arguments("[project-name]")
  .description("Default: Initialize a new project")
  .action(async (projectName, options) => {
    await init({ ...options, projectName });
  });

program.parse(process.argv);

