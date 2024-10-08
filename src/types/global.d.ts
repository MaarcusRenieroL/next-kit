export type AuthType = "next-auth" | "clerk" | "lucia" | "kinde" | "none" | null | undefined;
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
export type PackageManagerX = "npx" | "pnpx" | "yarn" | "bunx";
export type UILibrary = "shadcn-ui" | "radix-ui" | "chakra-ui" | "none" | null | undefined;
export type ORM = "prisma" | "drizzle" | "none" | null | undefined;
export type DatabaseType = "postgresql" | "mysql" | "sqlite" | "mongodb" | "none" | null | undefined;
export type Email = "sendgrid" | "mailgun" | "postmark" | "resend" | "none" | null | undefined;
export type Payment = "stripe" | "lemon-squeezy" | "razorpay" | "paypal" | "none" | null | undefined;
export type Analytics = "vercel-analytics" | "google-analytics" | "none" | null;
export type API = "rest" | "trpc" | "graphql" | "hono" | "none" | null | undefined;

export type DatabaseProvider = Exclude<DatabaseType, "none" | undefined | null>;

interface NextJSOptions {
  language: Language;
  tailwind?: boolean;
  eslint?: boolean;
  scopedAppName?: "src" | "app";
  empty?: boolean;
  skipInstall?: boolean;
}

interface PackagesOptions {
  uiLibrary: UILibrary;
  database: DatabaseType;
  auth: AuthType;
  email: Email;
  payment: Payment;
  analytics: Analytics;
  orm: ORM;
  api: API;
}

export interface CLIOptions extends NextJSOptions, PackagesOptions {
  projectName: string;
  packageManager: PackageManager;
  packageManagerX: PackageManagerX;
  alias: string;
  template?: any;
  targetDir?: string;
  projectDir: string;
}

export const availablePackages = ["prisma", "hono", "tailwind", "trpc", "clerk"] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export type Installer = (opts: CLIOptions) => void;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};
