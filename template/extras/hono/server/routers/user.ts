// @ts-nocheck
import { Hono } from "hono";
import { Bindings } from "../types.js";

const users = new Hono<{ Bindings: Bindings }>().get("/", async (c, next) => {
  // Usage example
  return c.json({ users: [] });
});

export default users;
