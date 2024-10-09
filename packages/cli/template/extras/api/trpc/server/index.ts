import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { postRouter } from "./routers/post.router";
import { router } from "./trpc";

export const appRouter = router({
  // all your rourter will be added here manually
  post: postRouter,
});

export type AppRouter = typeof appRouter;

// infer the types for your router
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
