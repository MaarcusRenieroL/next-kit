import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";

export const razorpayInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  addPackageDependency({
    projectDir,
    dependencies: ["razorpay"],
    devMode: false,
  });

  if (empty) return;

  const base = path.join(projectDir, scopedAppName === "src" ? "src" : "");

  const libContent = `// @ts-nocheck
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
`;
  const libDest = path.join(base, "libs/razorpay.ts");
  fs.mkdirSync(path.dirname(libDest), { recursive: true });
  fs.writeFileSync(libDest, libContent);

  const routeContent = `// @ts-nocheck
import { NextResponse } from "next/server";

import { razorpay } from "@/libs/razorpay";

export async function POST(request: Request) {
  const { amount } = await request.json();

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
  });

  return NextResponse.json(order);
}
`;
  const routeDest = path.join(base, "app/api/razorpay/order/route.ts");
  fs.mkdirSync(path.dirname(routeDest), { recursive: true });
  fs.writeFileSync(routeDest, routeContent);

  fs.appendFileSync(
    path.join(projectDir, ".env"),
    "\n\nRAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID\nRAZORPAY_KEY_SECRET=YOUR_RAZORPAY_KEY_SECRET\nNEXT_PUBLIC_RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID"
  );
};
