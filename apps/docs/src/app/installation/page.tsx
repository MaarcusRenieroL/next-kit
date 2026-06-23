import { PageHeader, Prose, Callout } from "@/components/mdx";
import { CommandTabs } from "@/components/mdx/command-tabs";
import { CodeBlock } from "@/components/mdx/code-block";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Installation" };

export default function InstallationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting Started"
        title="Installation"
        lead="There's nothing to install globally. Run Nextkit straight from your package manager's runner whenever you want to start a new project."
      />

      <Prose>
        <h2>Requirements</h2>
        <ul>
          <li>
            <strong>Node.js 18.17 or newer.</strong> The CLI targets modern Node
            and the generated app uses Next.js 14.
          </li>
          <li>
            A package manager: <strong>npm</strong>, <strong>pnpm</strong>,{" "}
            <strong>yarn</strong>, or <strong>bun</strong>.
          </li>
        </ul>
        <p>Check your Node version:</p>
      </Prose>

      <CodeBlock shell code="node --version" />

      <Prose>
        <h2>Run the CLI</h2>
        <p>
          Pick your package manager and run the command below. It always pulls
          the latest version, so you never need to update a global install.
        </p>
      </Prose>

      <CommandTabs pkg="@mxrcxs17/next-kit@latest" />

      <Prose>
        <p>
          You can also pass a project name directly as an argument to skip the
          first prompt:
        </p>
      </Prose>

      <CodeBlock shell code="npx @mxrcxs17/next-kit@latest my-app" />

      <Prose>
        <Callout type="tip" title="Which runner?">
          Use the runner that matches your package manager — <code>npx</code>{" "}
          for npm, <code>pnpm dlx</code> for pnpm, <code>yarn dlx</code> for
          yarn, and <code>bunx</code> for bun. The CLI will also use your chosen
          manager to install the generated project&apos;s dependencies.
        </Callout>

        <p>
          Once it&apos;s running, head to the{" "}
          <a href="/quickstart">Quickstart</a> to walk through generating your
          first project.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
