// @ts-nocheck
import { cache } from "react";
export const createTRPCContext = cache(async ({ req }: { req?: Request }) => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  // a request object passed from the client when using query and mutaion with client side helper
  // request will always return undefined for server side fetching using createcaller.
  return { req };
});

export type Context = typeof createTRPCContext;
