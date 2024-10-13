// @ts-nocheck
import { hc as hcClient } from "hono/client";

import { AppType } from "@/server";

const URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const hc = hcClient<AppType>(URL);
