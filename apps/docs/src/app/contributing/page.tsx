import { PageHeader, Prose, Callout } from "@/components/mdx";
import { CodeBlock } from "@/components/mdx/code-block";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Contributing" };

export default function ContributingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference"
        title="Contributing"
        lead="Nextkit is open source and built in the open. Bug reports, ideas, and pull requests are all welcome."
      />

      <Prose>
        <h2>The repository</h2>
        <p>
          Everything lives in a single Turborepo on GitHub:{" "}
          <a
            href="https://github.com/MaarcusRenieroL/next-cli"
            target="_blank"
            rel="noreferrer"
          >
            MaarcusRenieroL/next-cli
          </a>
          . The CLI is in <code>packages/cli</code>, the marketing site in{" "}
          <code>apps/web</code>, and these docs in <code>apps/docs</code>.
        </p>

        <h2>Local setup</h2>
        <p>Clone the repo, install dependencies, and start the dev tasks:</p>
      </Prose>

      <CodeBlock
        shell
        code={
          "git clone https://github.com/MaarcusRenieroL/next-cli.git\ncd next-cli\npnpm install\npnpm dev"
        }
      />

      <Prose>
        <p>
          To work on just one part of the monorepo, use the filtered scripts —
          for example <code>pnpm dev:web</code> for the site or{" "}
          <code>pnpm dev:cli</code> for the CLI.
        </p>

        <Callout type="tip" title="Running these docs">
          From the repo root, run <code>pnpm --filter docs dev</code> to start
          the documentation app on port <code>3333</code>.
        </Callout>

        <h2>Reporting issues</h2>
        <p>
          Found a bug or have a feature request? Open an issue on the{" "}
          <a
            href="https://github.com/MaarcusRenieroL/next-cli/issues"
            target="_blank"
            rel="noreferrer"
          >
            issue tracker
          </a>
          . Include your OS, Node version, package manager, and the options you
          selected so it&apos;s easy to reproduce.
        </p>

        <h2>Pull requests</h2>
        <ul>
          <li>Fork the repo and create a branch for your change.</li>
          <li>Keep changes focused and match the existing code style.</li>
          <li>
            For a new integration, add an installer under{" "}
            <code>packages/cli/src/installers</code> and wire it into the
            prompts.
          </li>
          <li>Open a PR with a clear description of what and why.</li>
        </ul>
      </Prose>

      <DocFooter />
    </>
  );
}
