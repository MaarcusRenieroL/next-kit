import { CLIOptions, PackageManager, PackageManagerX } from "../types";
import { input, select } from "@inquirer/prompts";
import { exit, printSuccessMessage } from "../utils/message";

const packageManagerXMap: Record<PackageManager, PackageManagerX> = {
	yarn: "yarn", npm: "npx", pnpm: "pnpx", bun: "bunx",
};

export async function init(options: CLIOptions) {
	
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
	
	if (options.language === undefined) {
		options.language = await select({
			message: "Which programming language do you want to use? ›",
			choices: [
				{ name: "TypeScript", value: "typescript" },
				{ name: "JavaScript", value: "javascript" },
			]
		});
	}
	
	if (options.eslint === undefined) {
		options.eslint = await select({
			message: "Would you like to disable ESLint? ›",
			choices: [
				{ name: "No", value: false },
				{ name: "Yes", value: true },
			]
		});
	}
	
	if (options.tailwind === undefined) {
		options.tailwind = await select({
			message: "Do you want to include Tailwind CSS? ›",
			choices: [
				{ name: "No", value: false },
				{ name: "Yes", value: true },
			]
		});
	}
	
	if (options.directory === undefined) {
		options.directory = await select({
			message: "Which directory structure would you like to use? ›",
			choices: [
				{ name: "Pages", value: "pages" },
				{ name: "App", value: "app" },
			]
		});
	}
	
	if (options.directory === "app" && options.srcDir === undefined) {
		options.srcDir = await select({
			message: "Would you like to use the `src` directory? ›",
			choices: [
				{ name: "No", value: false },
				{ name: "Yes", value: true },
			]
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
	
	if (!options.packageManager) {
		try {
			options.packageManager = await select({
				message: "Which package manager would you like to use? ›",
				choices: [
					{ name: "Npm", value: "npm" },
					{ name: "Yarn", value: "yarn" },
					{ name: "Pnpm", value: "pnpm" },
					{ name: "Bun", value: "bun" }
				]
			});
		} catch (error) {
			exit();
		}
	}
	
	if (!options.packageManagerX) {
		options.packageManagerX = packageManagerXMap[options.packageManager];
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
				]
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
				]
			});
		} catch (error) {
			exit();
		}
	}
	
	if (options.database !== "none") {
		
		if (!options.orm) {
			try {
				options.orm = await select({
					message: "Which ORM would you like to use? ›",
					choices: [
						{ name: "No ORM", value: "none" },
						{ name: "Prisma", value: "prisma" },
						{ name: "Drizzle", value: "drizzle" },
					]
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
					]
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
					]
				});
			} catch (error) {
				exit();
			}
		}
		
	} else {
		
		if (!options.auth) {
			try {
				options.auth = await select({
					message: "Which authentication package would you like to use? ›",
					choices: [
						{ name: "No Authentication", value: "none" },
						{ name: "Clerk", value: "clerk" },
						{ name: "Kinde", value: "kinde" },
						{ name: "Lucia", value: "lucia" },
					]
				});
			} catch (error) {
				exit();
			}
		}
	}
	
	if (!options.api) {
		try {
			options.api = await select({
				message: "How do you want to write your APIs",
				choices: [
					{ name: "No APIs", value: "none" },
					{ name: "Rest API", value: "rest" },
					{ name: "Hono", value: "hono" },
					{ name: "tRPC", value: "trpc" },
					{ name: "GraphQL", value: "graphql" },
				]
			})
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
				]
			});
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
			]
		});
	}
	
	if (options.skipInstall === undefined) {
		options.skipInstall = await select({
			message: "Would you like to skip running `npm install`? ›",
			choices: [
				{ name: "No", value: false },
				{ name: "Yes", value: true },
			]
		});
	}
	
	if (options.skipInstall) {
		printSuccessMessage(options.projectName, options.packageManager);
	}
	
	console.log(options);
}
