import { PageHeader, Prose, Callout } from "@/components/mdx";
import { CodeBlock } from "@/components/mdx/code-block";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Project structure" };

const tree = `my-app/
├─ src/                  # your application code (or app/ at root if you opt out)
│  ├─ app/               # Next.js App Router — routes, layouts, pages
│  │  ├─ layout.tsx      # root layout
│  │  └─ page.tsx        # home page
│  ├─ providers/         # client providers (theme, query client, auth, …)
│  ├─ libs/              # shared helpers, e.g. utils.ts
│  └─ styles/            # global stylesheet(s)
├─ public/               # static assets
├─ next.config.js        # Next.js configuration
├─ tsconfig.json         # TypeScript config (with your import alias)
├─ package.json
└─ .gitignore`;

export default function ProjectStructurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting Started"
        title="Project structure"
        lead="A tour of what Nextkit generates. The exact files depend on the options you choose, but the foundation is always a standard Next.js App Router project."
      />

      <Prose>
        <h2>A typical layout</h2>
        <p>
          With the defaults (a <code>src/</code> directory, Tailwind, and
          shadcn/ui) a generated project looks roughly like this:
        </p>
      </Prose>

      <CodeBlock title="my-app" code={tree} />

      <Prose>
        <Callout type="note" title="It depends on your choices">
          Each integration adds its own files. Picking an ORM adds a schema and
          a database client; picking auth adds route handlers, providers, and
          env entries; an API layer adds its own folder. The pages under{" "}
          <strong>Your stack</strong> describe what each one contributes.
        </Callout>

        <h2>Key directories</h2>
        <ul>
          <li>
            <strong>app/</strong> — the App Router. Routes, layouts, and server
            components live here.
          </li>
          <li>
            <strong>providers/</strong> — client-side context providers that
            wrap your app (theme, data fetching, auth session, and so on).
          </li>
          <li>
            <strong>libs/</strong> — shared utilities, such as the{" "}
            <code>cn()</code> class-name helper used with Tailwind and
            shadcn/ui.
          </li>
          <li>
            <strong>styles/</strong> — the global stylesheet where
            Tailwind&apos;s layers are imported.
          </li>
        </ul>

        <h2>Environment variables</h2>
        <p>
          Integrations that need secrets (auth, payments, email, analytics) add
          the required keys to your env file. Fill them in before using those
          features — each stack page lists the variables it expects.
        </p>

        <h2>It&apos;s yours</h2>
        <p>
          After generation there&apos;s no lock-in. The result is a plain
          Next.js project with no runtime dependency on the CLI, so you&apos;re
          free to rename, move, or remove anything.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
