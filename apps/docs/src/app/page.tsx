import { PageHeader, Prose, CardGrid, Card, Callout } from "@/components/mdx";
import { CommandTabs } from "@/components/mdx/command-tabs";
import { DocFooter } from "@/components/mdx/doc-footer";

export default function IntroductionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting Started"
        title="Introduction"
        lead="Nextkit is an interactive CLI that scaffolds a production-ready, full-stack Next.js application — wired up with your choice of database, ORM, auth, API layer, payments, email, and analytics."
      />

      <Prose>
        <p>
          Every new project starts the same way: spin up Next.js, wire in a
          database and ORM, bolt on authentication, decide how you&apos;ll write
          your API, and glue together payments, email, and analytics. Nextkit
          does all of that in a single command, so you can skip the boilerplate
          and start building features.
        </p>

        <p>
          You answer a handful of prompts, and Nextkit generates a typed,
          configured project with every piece connected. The output is a
          standard Next.js app that you fully own — there&apos;s no runtime
          dependency on the CLI after generation.
        </p>

        <h2>Try it now</h2>
        <p>Scaffold a new project without installing anything globally:</p>
      </Prose>

      <CommandTabs pkg="nextkit@latest" />

      <Prose>
        <Callout type="note" title="Requirements">
          Nextkit needs <strong>Node.js 18.17+</strong> and one of npm, pnpm,
          yarn, or bun. See <a href="/installation">Installation</a> for the
          full details.
        </Callout>

        <h2>What you get</h2>
        <ul>
          <li>A complete Next.js App Router project, typed end-to-end.</li>
          <li>
            Your chosen database and ORM, with schema and client preconfigured.
          </li>
          <li>Authentication wired into routes, providers, and env files.</li>
          <li>An API layer ready to go — tRPC, Hono, GraphQL, or REST.</li>
          <li>Optional payments, email, and analytics integrations.</li>
          <li>Tailwind CSS, shadcn/ui, ESLint, and Prettier, preconfigured.</li>
        </ul>

        <h2>Explore the docs</h2>
      </Prose>

      <CardGrid>
        <Card title="Installation" href="/installation">
          Requirements and the commands for every package manager.
        </Card>
        <Card title="Quickstart" href="/quickstart">
          Generate and run your first project in a couple of minutes.
        </Card>
        <Card title="CLI options" href="/cli-options">
          Every prompt the CLI asks and what each option does.
        </Card>
        <Card title="Project structure" href="/project-structure">
          A tour of the files and folders Nextkit generates.
        </Card>
      </CardGrid>

      <DocFooter />
    </>
  );
}
