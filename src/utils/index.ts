import { execSync } from 'child_process';
import { chdir } from 'process';

import { CLIOptions } from "../types";
import chalk from "chalk";

export function getInitCommand(packageManager: string, directory: string): string {
	chdir(directory);
	switch (packageManager) {
		case "npm":
			console.log("Npm init command")
			return "npm init -y";
		case "yarn":
			return "yarn init -y";
		case "pnpm":
			return "pnpm init -y";
		default:
			throw new Error("Unsupported package manager");
	}
}

export function getPackageList(options: CLIOptions) {
	const object: {
		dependencies: string[],
		devDependencies: string[]
	} = {
		dependencies: [],
		devDependencies: []
	};
	
	object.dependencies.push("next", "react", "react-dom");
	object.devDependencies.push("@types/node", "@types/react", "@types/react-dom");
	
	if (options.language === "typescript") {
		object.dependencies.push("typescript", "ts-node", "@types/node");
	}
	
	if (options.eslint) {
		object.devDependencies.push("eslint", "eslint-config-next");
	}
	
	if (options.tailwind) {
		object.devDependencies.push("tailwindcss", "postcss");
	}
	
	if (options.auth) {
		switch (options.auth) {
			case "next-auth":
				object.dependencies.push("next-auth");
				break;
			case "clerk":
				object.dependencies.push("@clerk/nextjs");
				break;
			case "lucia":
				object.dependencies.push("lucia");
				break;
			case "kinde":
				object.dependencies.push("@kinde-oss/kinde-auth-nextjs");
				break;
			default:
				break;
		}
	}
	
	if (options.uiLibrary) {
		object.dependencies.push("lucide-react")
		switch (options.uiLibrary) {
			case "shadcn-ui":
				object.dependencies.push("shadcn-ui");
				break;
			case "radix-ui":
				object.dependencies.push("radix-ui");
				break;
			case "chakra-ui":
				object.dependencies.push("@chakra-ui/react", "@emotion/react", "@emotion/styled", "framer-motion");
				break;
			default:
				break;
		}
	}
	
	if (options.orm) {
		switch (options.orm) {
			case "prisma":
				object.dependencies.push("prisma", "@prisma/client");
				break;
			case "drizzle":
				object.dependencies.push("drizzle-orm", "drizzle-kit");
				break;
			default:
				break;
		}
	}
	
	if (options.email) {
		switch (options.email) {
			case "sendgrid":
				object.dependencies.push("@sendgrid/mail");
				break;
			case "mailgun":
				object.dependencies.push("mailgun.js");
				break;
			case "postmark":
				object.dependencies.push("postmark");
				break;
			case "resend":
				object.dependencies.push("resend");
				break;
			default:
				break;
		}
	}
	
	if (options.api) {
		switch (options.api) {
			case "rest":
				object.dependencies.push("axios");
				break;
			case "trpc":
				object.dependencies.push("@trpc/server", "@trpc/next", "@trpc/react-query", "@trpc/client");
				break;
			case "graphql":
				object.dependencies.push("graphql", "apollo-server");
				break;
			case "hono":
				object.dependencies.push("hono");
				break;
			default:
				break;
		}
	}
	
	return object;
}

export async function installPackages(packageList: string[], packageManager: string) {
	
	const installCommand =
		packageManager === 'npm'
			? 'npm install'
			: packageManager === 'yarn'
				? 'yarn add'
				: packageManager === 'pnpm'
					? 'pnpm add'
					: null;
	
	if (!installCommand) {
		console.error(chalk.red(`Unsupported package manager: ${packageManager}`));
		return;
	}
	
	const installedPackages = [];
	
	for (let i = 0; i < packageList.length; i++) {
		const pkg = packageList[i];
		process.stdout.write(`Installing package ${i + 1}: ${pkg}... `);
		
		try {

			execSync(`npm install ${pkg}`, { stdio: 'ignore' });
			installedPackages.push(pkg);
			
		} catch (error) {
			process.stdout.write(`${error}\n`);
		}
		
		if (i < packageList.length - 1) {
			process.stdout.write('\r');
		}
		
		console.log(chalk.greenBright(`${pkg} installed successfully`))
	}
	
	console.log(chalk.green('All packages installed successfully.'));
}
