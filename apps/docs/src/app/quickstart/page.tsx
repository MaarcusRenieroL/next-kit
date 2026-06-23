import { PageHeader, Prose, Steps, Step, Callout } from "@/components/mdx";
import { CommandTabs } from "@/components/mdx/command-tabs";
import { CodeBlock } from "@/components/mdx/code-block";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Quickstart" };

export default function QuickstartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting Started"
        title="Quickstart"
        lead="Generate a full-stack Next.js app and have it running locally in a couple of minutes."
      />

      <Steps>
        <Step title="Run the CLI">
          <p className="mb-2">
            Start the interactive generator with your package manager:
          </p>
          <CommandTabs pkg="nextkit@latest" />
        </Step>

        <Step title="Answer the prompts">
          <p>
            Nextkit walks you through your stack — project name, database, ORM,
            auth, API layer, payments, email, analytics, and tooling. Press{" "}
            <strong>Enter</strong> to accept the sensible default for any
            prompt. See <a href="/cli-options">CLI options</a> for the full
            list.
          </p>
        </Step>

        <Step title="Let it scaffold and install">
          <p>
            The CLI generates your project and (unless you skip it) installs
            dependencies with the package manager you chose. When it finishes,
            you&apos;ll see a summary with the next steps.
          </p>
        </Step>

        <Step title="Start the dev server">
          <p className="mb-2">Move into your new project and run it:</p>
          <CodeBlock shell code={"cd my-app\nnpm run dev"} />
          <p>
            Open <a href="http://localhost:3000">http://localhost:3000</a> to
            see your app.
          </p>
        </Step>
      </Steps>

      <Prose>
        <Callout type="tip" title="Skipping the install">
          If you answer <strong>Yes</strong> to &quot;skip install&quot;, the
          CLI generates the files but doesn&apos;t install dependencies. Run
          your manager&apos;s install command yourself afterwards (for example{" "}
          <code>npm install</code>).
        </Callout>

        <h2>What&apos;s next</h2>
        <p>
          Dig into the specific layer you picked —{" "}
          <a href="/database">Database</a>, <a href="/orm">ORM</a>,{" "}
          <a href="/authentication">Authentication</a>,{" "}
          <a href="/api">API layer</a>, <a href="/payments">Payments</a>,{" "}
          <a href="/email">Email</a>, or <a href="/analytics">Analytics</a> — to
          learn what was wired up and which environment variables to set.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
