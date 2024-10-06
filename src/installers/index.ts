import { AvailablePackages, CLIOptions, DatabaseProvider, PkgInstallerMap } from "@/types/global.js";
import { prismaInstaller } from "./prisma.js";
import { honoInstaller } from "./hono.js";

export const buildPkgInstallerMap = (packages: AvailablePackages[], databaseProvider: DatabaseProvider): PkgInstallerMap => ({
  prisma: {
    inUse: packages.includes("prisma"),
    installer: prismaInstaller,
  },
  hono:{
    inUse:packages.includes("hono"),
    installer: honoInstaller,
  }
});
