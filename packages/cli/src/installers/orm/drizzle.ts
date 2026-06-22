import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";
import { type PackageJson } from "type-fest";

type Dialect = "postgresql" | "mysql" | "sqlite";

const clientByDialect: Record<Dialect, string> = {
  postgresql: `// @ts-nocheck
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema });
`,
  mysql: `// @ts-nocheck
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

import * as schema from "./schema";

const pool = mysql.createPool(process.env.DATABASE_URL!);

export const db = drizzle(pool, { schema, mode: "default" });
`,
  sqlite: `// @ts-nocheck
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

const client = createClient({ url: process.env.DATABASE_URL! });

export const db = drizzle(client, { schema });
`,
};

const schemaByDialect: Record<Dialect, string> = {
  postgresql: `// @ts-nocheck
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
`,
  mysql: `// @ts-nocheck
import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
`,
  sqlite: `// @ts-nocheck
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
`,
};

export const drizzleInstaller: Installer = ({ targetDir, projectName, scopedAppName, database, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  // drizzle has no mongodb dialect; fall back to postgres for that combo
  const dialect: Dialect = database === "mysql" ? "mysql" : database === "sqlite" ? "sqlite" : "postgresql";

  addPackageDependency({ projectDir, dependencies: ["drizzle-orm"], devMode: false });
  addPackageDependency({ projectDir, dependencies: ["drizzle-kit"], devMode: true });

  switch (dialect) {
    case "mysql":
      addPackageDependency({ projectDir, dependencies: ["mysql2"], devMode: false });
      break;
    case "sqlite":
      addPackageDependency({ projectDir, dependencies: ["@libsql/client"], devMode: false });
      break;
    default:
      addPackageDependency({ projectDir, dependencies: ["postgres"], devMode: false });
      break;
  }

  if (empty) return;

  const base = path.join(projectDir, scopedAppName === "src" ? "src" : "");
  const dbDir = path.join(base, "server/db");
  fs.mkdirSync(dbDir, { recursive: true });

  fs.writeFileSync(path.join(dbDir, "index.ts"), clientByDialect[dialect]);
  fs.writeFileSync(path.join(dbDir, "schema.ts"), schemaByDialect[dialect]);

  const schemaPath = `./${scopedAppName === "src" ? "src/" : ""}server/db/schema.ts`;
  const drizzleConfig = `import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "${dialect}",
  schema: "${schemaPath}",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
`;
  fs.writeFileSync(path.join(projectDir, "drizzle.config.ts"), drizzleConfig);

  // add db scripts
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
  };
  fs.writeJSONSync(packageJsonPath, packageJsonContent, { spaces: 2 });

  fs.appendFileSync(path.join(projectDir, ".env"), "\n\nDATABASE_URL=YOUR_DATABASE_URL");
};
