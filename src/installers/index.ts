import { AvailablePackages, DatabaseProvider, PkgInstallerMap } from "@/types/global.js";
import { honoInstaller } from "@/installers/api/hono.js";
import { prismaInstaller } from "@/installers/orm/prisma.js";
import { tailwindInstaller } from "@/installers/ui/tailwind.js";
import { clerkInstaller } from "@/installers/auth/clerk.js";
import { kindeInstaller } from "@/installers/auth/kinde.js";
import { restApiInstaller } from "@/installers/api/rest-api.js";

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
  clerk: {
    inUse: packages.includes("clerk"),
    installer: clerkInstaller,
  },
  kinde: {
    inUse: packages.includes("kinde"),
    installer: kindeInstaller,
  },
  "rest-api": {
    inUse: packages.includes("rest-api"),
    installer: restApiInstaller,
  },
});
