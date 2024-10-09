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

type EnvOptions = {
  server: Record<string, string>;
  client: Record<string, string>;
  runtimeEnv: Record<string, string>;
  skipValidation: boolean;
  emptyStringAsUndefined: boolean;
};

export const setupEnv = (projectDir: string, scopedAppName: string, options: CLIOptions) => {
  const envDir = path.join(projectDir, scopedAppName === "src" ? "src" : "", "env");

  if (!fs.existsSync(envDir)) {
    fs.mkdirSync(envDir, { recursive: true });
  }

  const envOptions: EnvOptions = {
    server: {
      NODE_ENV: 'z.enum(["development", "test", "production"]).default("development")',
    },
    client: {
      NEXT_PUBLIC_APP_URL: 'z.string().url().default(process.env.NEXT_PUBLIC_APP_URL || "")',
      NEXT_PUBLIC_VERCEL_URL: 'z.string().optional()',
      NEXT_PUBLIC_NODE_ENV: 'z.enum(["development", "test", "production"]).default("development")',
    },
    runtimeEnv: {
      NODE_ENV: 'process.env.NODE_ENV',
      NEXT_PUBLIC_APP_URL: 'process.env.NEXT_PUBLIC_APP_URL',
      NEXT_PUBLIC_VERCEL_URL: 'process.env.NEXT_PUBLIC_VERCEL_URL',
      NEXT_PUBLIC_NODE_ENV: 'process.env.NEXT_PUBLIC_NODE_ENV'
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
  };

  // Add database configuration if specified
  if (options.database && options.database !== "none") {
    switch (options.database) {
      case "postgresql":
        envOptions.server["DATABASE_URL"] = 'z.string().url()';
        envOptions.runtimeEnv["DATABASE_URL"] = 'process.env.DATABASE_URL';
        break;
      case "mysql":
        envOptions.server["DATABASE_URL"] = 'z.string().url()';
        envOptions.runtimeEnv["DATABASE_URL"] = 'process.env.DATABASE_URL';
        break;
      case "sqlite":
        envOptions.server["DATABASE_URL"] = 'z.string()';
        envOptions.runtimeEnv["DATABASE_URL"] = 'process.env.DATABASE_URL';
        break;
      case "mongodb":
        envOptions.server["MONGO_URI"] = 'z.string().url()';
        envOptions.runtimeEnv["MONGO_URI"] = 'process.env.MONGO_URI';
        break;
    }
  }

  if (options.auth && options.auth !== "none") {
    switch (options.auth) {
      case "clerk":
        envOptions.client["NEXT_PUBLIC_CLERK_FRONTEND_API"] = 'z.string()';
        envOptions.server["CLERK_API_KEY"] = 'z.string()';
        envOptions.runtimeEnv["NEXT_PUBLIC_CLERK_FRONTEND_API"] = 'process.env.NEXT_PUBLIC_CLERK_FRONTEND_API';
        envOptions.runtimeEnv["CLERK_API_KEY"] = 'process.env.CLERK_API_KEY]';
        break;
      case "kinde":
        envOptions.server["KINDE_CLIENT_ID"] = 'z.string()';
        envOptions.server["KINDE_CLIENT_SECRET"] = 'z.string()';
        envOptions.server["KINDE_ISSUER_URL"] = 'z.string()';
        envOptions.server["KINDE_SITE_URL"] = 'z.string()';
        envOptions.server["KINDE_POST_LOGOUT_REDIRECT_URL"] = 'z.string()';
        envOptions.server["KINDE_POST_LOGIN_REDIRECT_URL"] = 'z.string()';
        envOptions.runtimeEnv["KINDE_CLIENT_ID"] = 'process.env.KINDE_CLIENT_ID';
        envOptions.runtimeEnv["KINDE_CLIENT_SECRET"] = 'process.env.KINDE_CLIENT_SECRET';
        envOptions.runtimeEnv["KINDE_ISSUER_URL"] = 'process.env.KINDE_ISSUER_URL';
        envOptions.runtimeEnv["KINDE_SITE_URL"] = 'process.env.KINDE_SITE_URL';
        envOptions.runtimeEnv["KINDE_POST_LOGOUT_REDIRECT_URL"] = 'process.env.KINDE_POST_LOGOUT_REDIRECT_URL';
        envOptions.runtimeEnv["KINDE_POST_LOGIN_REDIRECT_URL"] = 'process.env.KINDE_POST_LOGIN_REDIRECT_URL';
        break;
    }
  }

  const envFileContent = `
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: ${envOptions.server.NODE_ENV},
    ${Object.entries(envOptions.server)
      .filter(([key]) => key !== "NODE_ENV")
      .map(([key, value]) => `${key}: ${value}`)
      .join(",\n    ")},
  },
  client: {
    NEXT_PUBLIC_APP_URL: ${envOptions.client.NEXT_PUBLIC_APP_URL},
    NEXT_PUBLIC_VERCEL_URL: ${envOptions.client.NEXT_PUBLIC_VERCEL_URL},
    NEXT_PUBLIC_NODE_ENV: ${envOptions.client.NEXT_PUBLIC_NODE_ENV}
  },
  runtimeEnv: {
    NODE_ENV: ${envOptions.runtimeEnv.NODE_ENV},
    NEXT_PUBLIC_APP_URL: ${envOptions.runtimeEnv.NEXT_PUBLIC_APP_URL},
    NEXT_PUBLIC_VERCEL_URL: ${envOptions.runtimeEnv.NEXT_PUBLIC_VERCEL_URL},
    ${Object.entries(envOptions.runtimeEnv)
      .filter(([key]) => key !== "NODE_ENV" && key !== "NEXT_PUBLIC_APP_URL" && key !== "NEXT_PUBLIC_VERCEL_URL")
      .map(([key, value]) => `${key}: ${value}`)
      .join(",\n    ")},
  },
  skipValidation: ${envOptions.skipValidation},
  emptyStringAsUndefined: ${envOptions.emptyStringAsUndefined},
});
`;

  fs.writeFileSync(path.join(envDir, 'index.ts'), envFileContent.trim());
};
