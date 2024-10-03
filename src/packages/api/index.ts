import { CLIOptions } from "../../types";
import { chdir } from "process";
import { mkdirSync, writeFileSync } from "fs";
import { restAPIContent } from "./file-contents";

export async function createAPIs(options: CLIOptions) {
	const { api } = options;
	
	switch (api) {
		case "rest":
			await createRestAPI();
      break;
    default:
			console.error(`Unsupported API: ${api}`);
			process.exit(1);
	}
}

async function createRestAPI() {
  chdir("src/app");
	mkdirSync("api");
	chdir("api")
	mkdirSync("route")
	chdir("route")
	
	writeFileSync("route.ts", restAPIContent)
}
