import { CLIOptions } from "../../types";

export async function createAuth(options: CLIOptions) {
  const { auth } = options;

  switch (auth) {
    case "clerk":
      console.log("Coming soon...");
      break;
    case "lucia":
      console.log("Coming soon...");
      break;
    case "kinde":
      console.log("Coming soon...");
      break;
    case "next-auth":
      console.log("Coming soon...");
      break;
    default:
      process.exit(1);
  }
}

function createNextAuth() {}
