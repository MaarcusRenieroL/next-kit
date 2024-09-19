#!/usr/bin/env node

import { printIntroMessage } from "./utils/message";
import { Command } from "commander";

const program = new Command();
program.name("CLI").description("A CLI to get started with your next Next.js Project").version("1.0.0");

printIntroMessage()

program
	.arguments("[project-name]")
	.description("Default: Initialize a new project")
	.action(async (projectName, options) => {
		console.log("Commander Initialized")
	});

program
	.command("init")
	.description("Initialize a new project")
	.argument("[project-name]", "Name of the project")
	.option("--package-manager <pm>", "Specify the package manager to use (npm, pnpm, yarn, bun)")
	.action(async (projectName, options) => {
		console.log("Commander Initialized")
	});

program.parse(process.argv);