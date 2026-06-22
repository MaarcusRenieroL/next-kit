import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";

export const stripeInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  addPackageDependency({
    projectDir,
    dependencies: ["stripe", "@stripe/stripe-js"],
    devMode: false,
  });

  if (empty) return;

  const base = path.join(projectDir, scopedAppName === "src" ? "src" : "");

  const libContent = `// @ts-nocheck
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
`;
  const libDest = path.join(base, "libs/stripe.ts");
  fs.mkdirSync(path.dirname(libDest), { recursive: true });
  fs.writeFileSync(libDest, libContent);

  const routeContent = `// @ts-nocheck
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";

export async function POST(request: Request) {
  const { priceId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/success\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/cancel\`,
  });

  return NextResponse.json({ url: session.url });
}
`;
  const routeDest = path.join(base, "app/api/stripe/checkout/route.ts");
  fs.mkdirSync(path.dirname(routeDest), { recursive: true });
  fs.writeFileSync(routeDest, routeContent);

  fs.appendFileSync(
    path.join(projectDir, ".env"),
    "\n\nSTRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY\nSTRIPE_WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY"
  );
};
