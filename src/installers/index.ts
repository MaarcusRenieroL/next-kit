import { AvailablePackages, DatabaseProvider, PkgInstallerMap } from "@/types/global.js";
import { honoInstaller } from "./hono.js";
import { prismaInstaller } from "./prisma.js";
import { tailwindInstaller } from "@/installers/tailwind.js";

export const buildPkgInstallerMap = (packages: AvailablePackages[], databaseProvider: DatabaseProvider): PkgInstallerMap => ({
  prisma: {
    inUse: packages.includes("prisma"),
    installer: prismaInstaller,
  },
  hono: {
    inUse: packages.includes("hono"),
    installer: honoInstaller,
  },
  tailwind: {
    inUse: packages.includes("tailwind"),
    installer: tailwindInstaller,
  },
  trpc: {
    inUse: packages.includes("trpc"),
    installer: () => {},
  },
});
