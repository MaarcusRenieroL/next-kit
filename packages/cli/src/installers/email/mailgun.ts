import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";

export const mailgunInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  addPackageDependency({ projectDir, dependencies: ["mailgun.js", "form-data"], devMode: false });

  if (empty) return;

  const base = path.join(projectDir, scopedAppName === "src" ? "src" : "");

  const libContent = `// @ts-nocheck
import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY! });

export const sendEmail = async (options: { to: string; subject: string; html: string }) => {
  return mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: process.env.MAILGUN_FROM_EMAIL!,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};
`;
  const libDest = path.join(base, "libs/email.ts");
  fs.mkdirSync(path.dirname(libDest), { recursive: true });
  fs.writeFileSync(libDest, libContent);

  fs.appendFileSync(
    path.join(projectDir, ".env"),
    "\n\nMAILGUN_API_KEY=YOUR_MAILGUN_API_KEY\nMAILGUN_DOMAIN=YOUR_MAILGUN_DOMAIN\nMAILGUN_FROM_EMAIL=YOUR_FROM_EMAIL"
  );
};
