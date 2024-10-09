import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "..";

// a client side helper to get data.
export const trpc = createTRPCReact<AppRouter>();
