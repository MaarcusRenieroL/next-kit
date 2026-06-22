// @ts-nocheck
import { Hono } from "hono";
import { Bindings } from "../types";

const users = new Hono<{ Bindings: Bindings }>().get("/", async (c) => {
  // Usage example
  return c.json({ users: [] });
});

export default users;
