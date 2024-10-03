import { CLIOptions } from "../../types";
import { chdir } from "process";
import { mkdirSync, writeFileSync } from "fs";
import {
	indexTrpcContent, providerContent,
	restAPIContent,
	trpcContent,
	trpcProviderContent,
	trpcRouteContent,
	usersRouterContent
} from "./file-contents";

export async function createAPIs(options: CLIOptions) {
	const { api } = options;
	
	switch (api) {
		case "rest":
			await createRestAPI();
			break;
		case "trpc":
			await createTrpcAPI();
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
	
	chdir("../../../")
}

async function createTrpcAPI() {
	chdir("src");
	
	mkdirSync("server");
	
	chdir("server");
	
	writeFileSync("trpc.ts", trpcContent);
	writeFileSync("index.ts", indexTrpcContent);
	
	mkdirSync("routers");
	chdir("routers");
	
	writeFileSync("users.ts", usersRouterContent);
	
	chdir("../../");
	
	chdir("app")
	
	mkdirSync("api")
	chdir("api")
	
	mkdirSync("trpc")
	chdir("trpc")
	
	mkdirSync("[trpc]")
	chdir("[trpc]")
	
	writeFileSync("route.ts", trpcRouteContent);
	
	chdir("../../../../")
	
	mkdirSync("components");
	chdir("components");
	mkdirSync("providers")
	chdir("providers");
	
	writeFileSync("trpc-provider.tsx", trpcProviderContent);
	writeFileSync("index.tsx", providerContent)
}