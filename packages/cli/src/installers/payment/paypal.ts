import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import { existsSync } from "fs";
import fs from "fs-extra";
import path from "path";

export const paypalInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  addPackageDependency({
    projectDir,
    dependencies: ["@paypal/react-paypal-js"],
    devMode: false,
  });

  if (empty) return;

  const base = path.join(projectDir, scopedAppName === "src" ? "src" : "");

  const providerContent = `// @ts-nocheck
"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { FC, ReactNode } from "react";

type Props = { children?: ReactNode };

export const PayPalProvider: FC<Props> = ({ children }) => {
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "" }}>
      {children}
    </PayPalScriptProvider>
  );
};
`;
  const providerDest = path.join(base, "providers/paypal-provider.tsx");
  fs.mkdirSync(path.dirname(providerDest), { recursive: true });
  fs.writeFileSync(providerDest, providerContent);

  const providerIndexPath = path.join(base, "providers/index.tsx");
  if (existsSync(providerIndexPath)) {
    const content = fs.readFileSync(providerIndexPath, "utf-8");
    const updated = content.replace(
      "{children}",
      `
      <PayPalProvider>
        {children}
      </PayPalProvider>
      `
    );
    fs.writeFileSync(providerIndexPath, 'import { PayPalProvider } from "@/providers/paypal-provider";\n' + updated, "utf-8");
  }

  fs.appendFileSync(path.join(projectDir, ".env"), "\n\nNEXT_PUBLIC_PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID\nPAYPAL_CLIENT_SECRET=YOUR_PAYPAL_CLIENT_SECRET");
};
