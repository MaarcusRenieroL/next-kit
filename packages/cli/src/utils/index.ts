import { existsSync, mkdirSync, writeFileSync } from "fs";

export const getInstallCommand = (pkgManager: string, pkg: string, isDev: boolean) => {
  switch (pkgManager) {
    case "npm":
      return `npm install ${isDev ? "--save-dev" : ""} ${pkg}`;
    case "yarn":
      return `yarn add ${isDev ? "--dev" : ""} ${pkg}`;
    case "pnpm":
      return `pnpm add ${isDev ? "--save-dev" : ""} ${pkg}`;
    case "bun":
      return `bun add ${pkg} ${isDev ? "--dev" : ""}`;
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
