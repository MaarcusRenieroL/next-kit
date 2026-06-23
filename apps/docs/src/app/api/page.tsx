import { PageHeader, Prose, OptionList, Callout } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "API layer" };

export default function ApiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your stack"
        title="API layer"
        lead="Decide how you'll write your backend. Nextkit scaffolds the chosen approach so you can start adding endpoints immediately."
      />

      <Prose>
        <h2>Available options</h2>
      </Prose>

      <OptionList
        options={[
          {
            name: "tRPC",
            value: "trpc",
            description:
              "End-to-end typesafe APIs — call your backend from the client with full type inference, no codegen.",
          },
          {
            name: "Hono",
            value: "hono",
            description:
              "A small, fast web framework for building APIs on the edge or Node.",
          },
          {
            name: "REST",
            value: "rest",
            description:
              "Conventional REST route handlers using the App Router.",
          },
          {
            name: "GraphQL",
            value: "graphql",
            description: "A GraphQL API for flexible, client-driven queries.",
          },
          {
            name: "No APIs",
            value: "none",
            description: "Skip the API layer and add your own later.",
          },
        ]}
      />

      <Prose>
        <Callout type="tip" title="Picking an approach">
          If you&apos;re building a TypeScript front end and back end together,
          tRPC gives you the tightest type safety with the least ceremony.
          Choose REST or GraphQL when you need a language-agnostic, public API,
          and Hono when you want a minimal framework with edge support.
        </Callout>

        <h2>What gets scaffolded</h2>
        <ul>
          <li>The framework or library installed and configured.</li>
          <li>A working example endpoint to build from.</li>
          <li>
            The client wiring needed to call it (for tRPC, the typed client).
          </li>
        </ul>
      </Prose>

      <DocFooter />
    </>
  );
}
