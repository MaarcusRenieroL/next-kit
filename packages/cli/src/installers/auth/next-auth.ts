import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import { existsSync } from "fs";
import fs from "fs-extra";
import path from "path";

export const nextAuthInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  addPackageDependency({
    projectDir,
    dependencies: ["next-auth"],
    devMode: false,
  });

  if (empty) return;

  const base = path.join(projectDir, scopedAppName === "src" ? "src" : "");

  // auth options
  const authConfig = `// @ts-nocheck
import GitHubProvider from "next-auth/providers/github";
import { type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
`;
  const authDest = path.join(base, "server/auth.ts");
  fs.mkdirSync(path.dirname(authDest), { recursive: true });
  fs.writeFileSync(authDest, authConfig);

  // route handler
  const routeContent = `// @ts-nocheck
import NextAuth from "next-auth";
import { authOptions } from "@/server/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
`;
  const routeDest = path.join(base, "app/api/auth/[...nextauth]/route.ts");
  fs.mkdirSync(path.dirname(routeDest), { recursive: true });
  fs.writeFileSync(routeDest, routeContent);

  // session provider
  const providerContent = `// @ts-nocheck
"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

type Props = { children?: ReactNode };

export const AuthProvider: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
`;
  const providerDest = path.join(base, "providers/auth-provider.tsx");
  fs.mkdirSync(path.dirname(providerDest), { recursive: true });
  fs.writeFileSync(providerDest, providerContent);

  // wrap providers/index.tsx
  const providerIndexPath = path.join(base, "providers/index.tsx");
  if (existsSync(providerIndexPath)) {
    const content = fs.readFileSync(providerIndexPath, "utf-8");
    const updated = content.replace(
      "{children}",
      `
      <AuthProvider>
        {children}
      </AuthProvider>
      `
    );
    fs.writeFileSync(providerIndexPath, 'import { AuthProvider } from "@/providers/auth-provider";\n' + updated, "utf-8");
  }

  fs.appendFileSync(
    path.join(projectDir, ".env"),
    "\n\nNEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET\nNEXTAUTH_URL=http://localhost:3000\nGITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID\nGITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET"
  );
};
