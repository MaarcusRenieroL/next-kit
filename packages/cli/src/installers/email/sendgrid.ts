import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";

export const sendgridInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  addPackageDependency({ projectDir, dependencies: ["@sendgrid/mail"], devMode: false });

  if (empty) return;

  const base = path.join(projectDir, scopedAppName === "src" ? "src" : "");

  const libContent = `// @ts-nocheck
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (options: { to: string; subject: string; html: string }) => {
  return sgMail.send({
    from: process.env.SENDGRID_FROM_EMAIL!,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};
`;
  const libDest = path.join(base, "libs/email.ts");
  fs.mkdirSync(path.dirname(libDest), { recursive: true });
  fs.writeFileSync(libDest, libContent);

  fs.appendFileSync(path.join(projectDir, ".env"), "\n\nSENDGRID_API_KEY=YOUR_SENDGRID_API_KEY\nSENDGRID_FROM_EMAIL=YOUR_VERIFIED_SENDER_EMAIL");
};
