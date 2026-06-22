import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "@/constants/index.js";
import { CLIOptions, PkgInstallerMap } from "@/types/global.js";
// Similar to _app, but for app router
type SelectBoilerplateProps = CLIOptions &
  Required<{
    packages: PkgInstallerMap;
    projectDir: string;
  }>;

export const selectLayoutFile = ({ projectDir, packages, scopedAppName }: SelectBoilerplateProps) => {
  const layoutFileDir = path.join(PKG_ROOT, "template/nextjs/app/layout");

  const usingTw = packages.tailwind.inUse;
  let layoutFile = "base.tsx";
  if (usingTw) {
    layoutFile = "with-tw.tsx";
  }

  const appSrc = path.join(layoutFileDir, layoutFile);
  const appDest = path.join(projectDir, scopedAppName === "src" ? "src" : "", "app/layout.tsx");
  fs.copySync(appSrc, appDest);
};

// Similar to index, but for app router
export const selectPageFile = ({ projectDir, scopedAppName, packages }: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/nextjs/app/page");

  let indexFile = "base.tsx";
  const usingTw = packages.tailwind.inUse;
  if (usingTw) {
    indexFile = "with-tw.tsx";
  }
  const indexSrc = path.join(indexFileDir, indexFile);
  const indexDest = path.join(projectDir, scopedAppName === "src" ? "src" : "", "app/page.tsx");
  fs.copySync(indexSrc, indexDest);
};

export const selectProviderFile = ({ projectDir, scopedAppName }: SelectBoilerplateProps) => {
  const providerFileDir = path.join(PKG_ROOT, "template/nextjs/providers");
  const providerFileDest = path.join(projectDir, scopedAppName === "src" ? "src" : "", "providers");

  fs.copySync(providerFileDir, providerFileDest);
};

export const selectLibsFile = ({ projectDir, scopedAppName }: SelectBoilerplateProps) => {
  const libsFileDir = path.join(PKG_ROOT, "template/nextjs/libs");
  const libsFileDest = path.join(projectDir, scopedAppName === "src" ? "src" : "", "libs");

  fs.copySync(libsFileDir, libsFileDest);
};

// the layout always imports "@/styles/globals.css", so ensure a stylesheet
// exists for every project. when tailwind is selected its installer overwrites
// this file with the @tailwind directives version.
export const selectStylesFile = ({ projectDir, scopedAppName }: SelectBoilerplateProps) => {
  const stylesSrc = path.join(PKG_ROOT, "template/nextjs/styles/base.css");
  const stylesDest = path.join(projectDir, scopedAppName === "src" ? "src" : "", "styles/globals.css");

  fs.copySync(stylesSrc, stylesDest);
};
