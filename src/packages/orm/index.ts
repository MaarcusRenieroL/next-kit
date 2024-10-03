import { CLIOptions } from "../../types";
import { createDirIfNotExists } from "../../utils";
import { writeFileSync } from "fs";
import { chdir } from "process";
import { prismaContent } from "./file-contents";

export async function createORMs(options: CLIOptions) {
  const { orm, database } = options;

  console.log(orm);

  if (!database) {
    return;
  }

  switch (orm) {
    case "prisma":
      createPrisma(database);
      break;
    case "drizzle":
      console.log("Coming soon...");
      break;
    default:
      process.exit(1);
  }
}

function createPrisma(database: string) {
  createDirIfNotExists("schema");
  chdir("schema");

  writeFileSync("schema.prisma", prismaContent(database));

  chdir("../");

  console.log(database);

  let database_url =
    database === "mysql"
      ? "mysql://[username]@[password]@[host]:[port]/[database-name]"
      : database === "postgresql"
        ? "postgresql://[username]@[password]@[host]:[port]/[database-name]"
        : database === "mongodb"
          ? "mongodb+srv://[username]:[password]@[host]/[defaultauthdb][?options]]"
          : database === "sqlite"
            ? "file:./[filename].db"
            : "";

  console.log(process.cwd());
  console.log(database_url);

  writeFileSync(".env", `\nDATABASE_URL="${database_url}"`);
}
