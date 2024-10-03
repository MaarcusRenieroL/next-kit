import { CLIOptions } from "../../types";
import {
  eslintricJSONFileContents,
  gitignoreContents,
  globalsCssFile,
  globalsCssFileWithTailwind,
  layoutTsxFileContent,
  layoutTsxFileContentWithTailwind,
  nextConfigMJSFileContents,
  nextEnvDTSFileContents,
  pageTsxFileContent,
  pageTsxFileContentWithTailwind,
  postcssConfigContent,
  tailwindConfigContent,
  tsconfigJSONFileContents,
} from "./file-contents";
import { chdir } from "process";
import { createDirIfNotExists, createFileIfNotExists } from "../../utils";
import { writeFileSync, readFileSync } from "fs";

export async function createNextApp(options: CLIOptions) {
  const { tailwind } = options;

  createFileIfNotExists(".gitignore", gitignoreContents);
  createFileIfNotExists(".env", "");
  createFileIfNotExists("next.config.mjs", nextConfigMJSFileContents);
  createFileIfNotExists("next-env.d.ts", nextEnvDTSFileContents);
  createFileIfNotExists(".eslintrc.json", eslintricJSONFileContents);
  createFileIfNotExists("tsconfig.json", tsconfigJSONFileContents);

  createDirIfNotExists("src");
  createDirIfNotExists("public");

  if (tailwind) {
    createFileIfNotExists("tailwind.config.ts", tailwindConfigContent);
    createFileIfNotExists("postcss.config.mjs", postcssConfigContent);
  }

  chdir("src");
  createDirIfNotExists("app");
  chdir("app");

  const pageContent = tailwind
    ? pageTsxFileContentWithTailwind
    : pageTsxFileContent;
  const layoutContent = tailwind
    ? layoutTsxFileContentWithTailwind
    : layoutTsxFileContent;
  const cssContent = tailwind ? globalsCssFileWithTailwind : globalsCssFile;

  createFileIfNotExists("page.tsx", pageContent);
  createFileIfNotExists("layout.tsx", layoutContent);
  createFileIfNotExists("globals.css", cssContent);

  chdir("../../");

  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

  packageJson.scripts = {
    ...packageJson.scripts,
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "next lint",
  };

  writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
}
