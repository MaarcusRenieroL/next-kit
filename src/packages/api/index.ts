import { CLIOptions } from "../../types";
import { chdir } from "process";
import { writeFileSync } from "fs";
import {
  indexTrpcContent,
  providerContent,
  restAPIContent,
  trpcContent,
  trpcProviderContent,
  trpcRouteContent,
  usersRouterContent,
} from "./file-contents";
import { createDirectory } from "../../utils";

export async function createAPIs(options: CLIOptions) {
  const { api } = options;

  switch (api) {
    case "rest":
      await createRestAPI();
      break;
    case "trpc":
      await createTrpcAPI();
      break;
    case "hono":
      console.log("Coming soon...");
      break;
    case "graphql":
      console.log("Coming soon...");
      break;
    default:
      console.error(`Invalid API type: ${api}`);
      process.exit(1);
  }
}

async function createRestAPI() {
  createDirectory("src/app/api/route");
  writeFileSync("src/app/api/route/route.ts", restAPIContent);
}

async function createTrpcAPI() {
  createDirectory("src/server/routers");
  writeFileSync("src/server/trpc.ts", trpcContent);
  writeFileSync("src/server/index.ts", indexTrpcContent);
  writeFileSync("src/server/routers/users.ts", usersRouterContent);

  createDirectory("src/app/api/trpc/[trpc]");
  writeFileSync("src/app/api/trpc/[trpc]/route.ts", trpcRouteContent);

  createDirectory("src/components/providers");
  writeFileSync(
    "src/components/providers/trpc-provider.tsx",
    trpcProviderContent,
  );
  writeFileSync("src/components/providers/index.tsx", providerContent);

  chdir("../../../");
}
