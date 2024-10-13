/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // gloabal packages
  jiti: "^1.21.6",
  "server-only": "^0.0.1",

  // eslint
  eslint: "^8",
  "eslint-config-next": "14.2.13",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-check-file": "^2.8.0",
  "eslint-plugin-n": "^17.11.1",

  // validation library
  zod: "^3.23.8",

  // env packages
  "@t3-oss/env-nextjs": "^0.11.1",
  dotenv: "^16.4.5",
  "dotenv-expand": "^11.0.6",

  // NextAuth.js
  "next-auth": "^4.24.7",
  "@auth/prisma-adapter": "^1.6.0",
  "@auth/drizzle-adapter": "^1.1.0",

  // clerk
  "@clerk/nextjs": "^5.6.0",

  // kinde
  "@kinde-oss/kinde-auth-nextjs": "^2.3.10",

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
  "@tanstack/react-query": "^5.59.0",
  "@trpc/client": "^11.0.0-rc.566",
  "@trpc/react-query": "^11.0.0-rc.566",
  "@trpc/server": "^11.0.0-rc.566",
  "client-only": "^0.0.1",
  "@trpc/next": "^11.0.0-rc.446",

  superjson: "^2.2.1",

  // rest-api
  axios: "^1.7.7",

  // resend
  resend: "4.0.0",
} as const;

export type AvailableDependencies = keyof typeof dependencyVersionMap;
