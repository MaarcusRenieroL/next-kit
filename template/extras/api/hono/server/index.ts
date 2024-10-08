// @ts-nocheck
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import users from "./routers/user.js";
import { Bindings } from "./types.js";

const app = new Hono<{ Bindings: Bindings }>().basePath("/api").use(cors());

/**
 * This is the primary router for your server.
 *
 * All routers added in /server/routers should be manually added here.
 */

const route = app.route("/user", users);

// The handler Next.js uses to answer API requests
export const httpHandler = handle(app);

/**
 * (Optional)
 * Exporting our API here for easy deployment
 *
 * Run `npm run deploy` for one-click API deployment to Cloudflare's edge network
 */
export default app;

// export type definition of API
export type AppType = typeof route;
