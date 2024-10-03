// api

export const restAPIContent = `export const GET = async () => {
  try {
    return generateSuccessMessage("Sample GET API", 200);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  }
};

export const POST = async (req: Request) => {
  try {
  return generateSuccessMessage("Sample POST API", 201);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  }
};


export const PUT = async (
  req: Request
) => {
  try {
    return generateSuccessMessage("Sample PUT API", 201);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  }
};

export const DELETE = async (
  req: Request,
) => {
  try {
    return generateSuccessMessage("Sample DELETE API", 200);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  }
};
`;

// trpc

export const trpcContent = `import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { ZodError } from "zod";

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const req = opts.req;
  return { req };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

`;

export const indexTrpcContent = `import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "./trpc";
import { userRouter } from "./routers/users";

export const appRouter = router({ user: userRouter });

export type AppRouter = typeof appRouter;
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
`;

export const usersRouterContent = `import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
	getUser: publicProcedure.query(async ({}) => {
		return {
			data: "Success",
		};
	});
})
`;

export const trpcRouteContent = `import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "~/server/index";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({ req }),
  });

export { handler as GET, handler as POST };

`;

export const trpcProviderContent = `"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { type FC, type ReactNode, useState } from "react";

import { client } from "~/lib/trpc/client";
import SuperJSON from "superjson";

type Props = {
  children?: ReactNode;
};

export const TRPCProvider: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    client.createClient({
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          url: "/api/trpc",
        }),
      ],
    }),
  );
  return (
    <client.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </client.Provider>
  );
};

`;

export const providerContent = `import type { FC, ReactNode } from "react";
import { TRPCProvider } from "./trpc-provider";

export const Providers: FC = () => {
  return (
    <TRPCProvider>
      {children}
    </TRPCProvider>
  );
};
`;

