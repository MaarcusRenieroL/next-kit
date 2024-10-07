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
  const usingTRPC = packages.trpc.inUse;
  let layoutFile = "base.tsx";
  if (usingTRPC && usingTw) {
    layoutFile = "with-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw) {
    layoutFile = "with-trpc.tsx";
  } else if (!usingTRPC && usingTw) {
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
