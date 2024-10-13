import { PKG_ROOT } from "@/constants/index.js";
import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";

export const kindeInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  // Add kinde dependencies
  addPackageDependency({
    projectDir,
    dependencies: ["@kinde-oss/kinde-auth-nextjs"],
    devMode: false,
  });

  if (!empty) {
    // Copy kinde-specific files
    const extrasDir = path.join(PKG_ROOT, "template/extras/auth");

    // route handler copy
    const kindeApiSrc = path.join(extrasDir, "kinde/api/index.ts");
    const apiRouteContent = fs.readFileSync(kindeApiSrc, "utf-8");

    const kindeApiDest = path.join(projectDir, scopedAppName === "src" ? "src" : "", "app/api/auth/[kindeAuth]/route.ts");
    fs.mkdirSync(path.dirname(kindeApiDest), { recursive: true });
    fs.writeFileSync(kindeApiDest, apiRouteContent);

    const envContents = `\n\nKINDE_CLIENT_ID=<your_kinde_client_id>
KINDE_CLIENT_SECRET=<your_kinde_client_secret>
KINDE_ISSUER_URL=https://<your_kinde_subdomain>.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard`;

    fs.appendFileSync(`${projectDir}/.env`, envContents);
  }
};
