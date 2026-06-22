import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";

export const postmarkInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  addPackageDependency({ projectDir, dependencies: ["postmark"], devMode: false });

  if (empty) return;

  const base = path.join(projectDir, scopedAppName === "src" ? "src" : "");

  const libContent = `// @ts-nocheck
import { ServerClient } from "postmark";

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

export const sendEmail = async (options: { to: string; subject: string; html: string }) => {
  return client.sendEmail({
    From: process.env.POSTMARK_FROM_EMAIL!,
    To: options.to,
    Subject: options.subject,
    HtmlBody: options.html,
  });
};
`;
  const libDest = path.join(base, "libs/email.ts");
  fs.mkdirSync(path.dirname(libDest), { recursive: true });
  fs.writeFileSync(libDest, libContent);

  fs.appendFileSync(path.join(projectDir, ".env"), "\n\nPOSTMARK_SERVER_TOKEN=YOUR_POSTMARK_SERVER_TOKEN\nPOSTMARK_FROM_EMAIL=YOUR_FROM_EMAIL");
};
