import { existsSync, mkdirSync, writeFileSync } from "fs";

// Installs every dependency already declared in the generated package.json in a
// single pass. Installing packages one-by-one re-resolves the whole tree on each
// call (slow) and surfaces transient peer-dependency errors; a single install
// lets the package manager resolve and dedupe everything together.
export const getInstallCommand = (pkgManager: string) => {
  switch (pkgManager) {
    case "npm":
      return "npm install";
    case "yarn":
      return "yarn install";
    case "pnpm":
      return "pnpm install";
    case "bun":
      return "bun install";
    default:
      throw new Error(`Unsupported package manager: ${pkgManager}`);
  }
};
export function createFileIfNotExists(fileName: string, content: string) {
  if (!existsSync(fileName)) {
    writeFileSync(fileName, content);
  }
}
export function createDirIfNotExists(dirName: string) {
  if (!existsSync(dirName)) {
    mkdirSync(dirName);
  }
}
