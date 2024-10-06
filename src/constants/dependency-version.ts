/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // gloabal packages
  jiti: "^1.21.6",
  "server-only": "^0.0.1",

  // NextAuth.js
  "next-auth": "^4.24.7",
  "@auth/prisma-adapter": "^1.6.0",
  "@auth/drizzle-adapter": "^1.1.0",

  // clerk
  "@clerk/nextjs": "^5.6.0",

  // Prisma
  prisma: "^5.14.0",
  "@prisma/client": "^5.14.0",
  "@prisma/adapter-planetscale": "^5.14.0",

  // hono
  hono: "^4.6.2",
  "@hono/zod-validator": "^0.2.2",

  // Drizzle
  "drizzle-kit": "^0.24.0",
  "drizzle-orm": "^0.33.0",
  "eslint-plugin-drizzle": "^0.2.3",
  "@planetscale/database": "^1.19.0",

  // Database
  mysql2: "^3.11.0",
  "@libsql/client": "^0.12.0",
  pg: "^8.13.0",
  postgres: "^3.4.4",

  // TailwindCSS
  tailwindcss: "^3.4.3",
  postcss: "^8.4.39",
  prettier: "^3.3.2",
  "prettier-plugin-tailwindcss": "^0.6.5",

  // tRPC
  "@trpc/client": "^11.0.0-rc.446",
  "@trpc/server": "^11.0.0-rc.446",
  "@trpc/react-query": "^11.0.0-rc.446",
  "@trpc/next": "^11.0.0-rc.446",
  "@tanstack/react-query": "^5.50.0",
  superjson: "^2.2.1",
} as const;

export type AvailableDependencies = keyof typeof dependencyVersionMap;
