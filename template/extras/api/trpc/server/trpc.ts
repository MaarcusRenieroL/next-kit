import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { Context } from "./trpc/context";
import { ZodError } from "zod";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  isServer: typeof window === "undefined" ? true : false,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
  isDev: process.env.NODE_ENV === "development" ? true : false,
});

export const middleware = t.middleware;
export const withAuth = middleware(async ({ next }) => {
  // add your authentication middleware here
  return next({
    ctx: {
      session: {
        userId: 1,
        name: "test",
      },
    },
  });
});

export const createCallerFactory = t.createCallerFactory;
export const router = t.router;

// Define all procedure here
export const procedure = t.procedure;

export const publicProcedure = procedure;
export const privateProcedure = procedure.use(withAuth);
