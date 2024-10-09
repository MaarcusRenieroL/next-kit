import "server-only"; //

import { appRouter } from "..";
import { createCallerFactory } from "../trpc";
import { createTRPCContext } from "./context";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "./query-client";

export const createCaller = createCallerFactory(appRouter);

export const getQueryClient = cache(makeQueryClient);

export const caller = createCallerFactory(appRouter)(() => createTRPCContext({ req: undefined }));

export const { trpc: server, HydrateClient } = createHydrationHelpers<typeof appRouter>(caller, getQueryClient);
