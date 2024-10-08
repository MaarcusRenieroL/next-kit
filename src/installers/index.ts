import { AvailablePackages, DatabaseProvider, PkgInstallerMap } from "@/types/global.js";
import { honoInstaller } from "@/installers/api/hono.js";
import { prismaInstaller } from "@/installers/orm/prisma.js";
import { tailwindInstaller } from "@/installers/ui/tailwind.js";

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
