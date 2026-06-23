import { PageHeader, Prose, OptionList, Callout } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "CLI options" };

export default function CliOptionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting Started"
        title="CLI options"
        lead="Every prompt Nextkit asks, in order, with the available choices and defaults. Press Enter to accept a default."
      />

      <Prose>
        <h2>Project name</h2>
        <p>
          The name of your project and the folder it&apos;s created in. Defaults
          to <code>cli-app</code>. You can also pass it as an argument:{" "}
          <code>npx nextkit@latest my-app</code>.
        </p>

        <h2>Location</h2>
        <p>
          Where to create the project. Defaults to the current working
          directory; the project folder is created inside it.
        </p>

        <h2>ESLint</h2>
        <p>Add ESLint for linting. Enabled by default.</p>
        <OptionList
          defaultValue="true"
          options={[
            {
              name: "Yes",
              value: "true",
              description: "Include ESLint configuration.",
            },
            { name: "No", value: "false", description: "Skip ESLint." },
          ]}
        />

        <h2>Tailwind CSS</h2>
        <p>Add Tailwind CSS for styling. Enabled by default.</p>
        <OptionList
          defaultValue="true"
          options={[
            {
              name: "Yes",
              value: "true",
              description: "Include Tailwind CSS and its config.",
            },
            { name: "No", value: "false", description: "Skip Tailwind CSS." },
          ]}
        />

        <h2>src/ directory</h2>
        <p>
          Whether to place your application code inside a <code>src/</code>{" "}
          directory. Defaults to <strong>Yes</strong>.
        </p>
        <OptionList
          defaultValue="src"
          options={[
            { name: "Yes", value: "src", description: "Use a src/ directory." },
            {
              name: "No",
              value: "app",
              description: "Keep app/ at the project root.",
            },
          ]}
        />

        <h2>Import alias</h2>
        <p>
          The path alias for imports. Defaults to <code>@/*</code> (so you can
          write <code>@/components/...</code>).
        </p>

        <h2>Package manager</h2>
        <p>
          The manager used to install the generated project&apos;s dependencies.
        </p>
        <OptionList
          options={[
            { name: "npm", value: "npm", description: "Install with npm." },
            { name: "yarn", value: "yarn", description: "Install with yarn." },
            { name: "pnpm", value: "pnpm", description: "Install with pnpm." },
            { name: "bun", value: "bun", description: "Install with bun." },
          ]}
        />

        <h2>UI library</h2>
        <p>An optional component library. Defaults to shadcn/ui.</p>
        <OptionList
          defaultValue="shadcn-ui"
          options={[
            {
              name: "ShadCN UI",
              value: "shadcn-ui",
              description: "Preconfigure shadcn/ui components.",
            },
            {
              name: "No UI Library",
              value: "none",
              description: "Skip the component library.",
            },
          ]}
        />

        <h2>Database</h2>
        <p>
          The database provider. Defaults to PostgreSQL. See{" "}
          <a href="/database">Database</a> for details.
        </p>
        <OptionList
          defaultValue="postgresql"
          options={[
            {
              name: "PostgreSQL",
              value: "postgresql",
              description: "Relational database (default).",
            },
            {
              name: "MongoDB",
              value: "mongodb",
              description: "Document database.",
            },
            {
              name: "MySQL",
              value: "mysql",
              description: "Relational database.",
            },
            {
              name: "SQLite",
              value: "sqlite",
              description: "File-based relational database.",
            },
            {
              name: "No Database",
              value: "none",
              description: "Skip the database entirely.",
            },
          ]}
        />

        <Callout type="note" title="Database-dependent prompts">
          The <strong>ORM</strong> and <strong>Payments</strong> prompts only
          appear when you choose a database. If you pick{" "}
          <strong>No Database</strong>, the auth choices are limited to Clerk,
          Kinde, or none (NextAuth requires a database).
        </Callout>

        <h2>ORM</h2>
        <p>
          Shown when a database is selected. Defaults to Prisma. See{" "}
          <a href="/orm">ORM</a>.
        </p>
        <OptionList
          defaultValue="prisma"
          options={[
            {
              name: "Prisma",
              value: "prisma",
              description: "Type-safe ORM with migrations (default).",
            },
            {
              name: "Drizzle",
              value: "drizzle",
              description: "Lightweight, SQL-first ORM.",
            },
            {
              name: "No ORM",
              value: "none",
              description: "Use the database without an ORM.",
            },
          ]}
        />

        <h2>Authentication</h2>
        <p>
          The auth provider. With a database the default is NextAuth. See{" "}
          <a href="/authentication">Authentication</a>.
        </p>
        <OptionList
          defaultValue="next-auth"
          options={[
            {
              name: "Next Auth",
              value: "next-auth",
              description: "Self-hosted auth (requires a database).",
            },
            {
              name: "Clerk",
              value: "clerk",
              description: "Managed user-management service.",
            },
            {
              name: "Kinde",
              value: "kinde",
              description: "Managed auth and user access.",
            },
            {
              name: "No Authentication",
              value: "none",
              description: "Skip authentication.",
            },
          ]}
        />

        <h2>Payments</h2>
        <p>
          Shown when a database is selected. See{" "}
          <a href="/payments">Payments</a>.
        </p>
        <OptionList
          options={[
            {
              name: "No Payment Service",
              value: "none",
              description: "Skip payments.",
            },
            {
              name: "Stripe",
              value: "stripe",
              description: "Card payments and subscriptions.",
            },
            {
              name: "Paypal",
              value: "paypal",
              description: "PayPal checkout.",
            },
            {
              name: "Lemon Squeezy",
              value: "lemon-squeezy",
              description: "Merchant of record for SaaS.",
            },
            {
              name: "Razorpay",
              value: "razorpay",
              description: "Payments for India and beyond.",
            },
          ]}
        />

        <h2>Email</h2>
        <p>
          The transactional email provider. Defaults to Resend. See{" "}
          <a href="/email">Email</a>.
        </p>
        <OptionList
          defaultValue="resend"
          options={[
            {
              name: "Resend",
              value: "resend",
              description: "Developer-first email API (default).",
            },
            {
              name: "Mailgun",
              value: "mailgun",
              description: "Email delivery service.",
            },
            {
              name: "Sendgrid",
              value: "sendgrid",
              description: "Email delivery at scale.",
            },
            {
              name: "Postmark",
              value: "postmark",
              description: "Fast transactional email.",
            },
            {
              name: "No Email Package",
              value: "none",
              description: "Skip email.",
            },
          ]}
        />

        <h2>API layer</h2>
        <p>
          How you write your APIs. See <a href="/api">API layer</a>.
        </p>
        <OptionList
          options={[
            {
              name: "Hono",
              value: "hono",
              description: "Small, fast web framework.",
            },
            {
              name: "tRPC",
              value: "trpc",
              description: "End-to-end typesafe APIs.",
            },
            {
              name: "Rest API",
              value: "rest",
              description: "Conventional REST route handlers.",
            },
            {
              name: "GraphQL",
              value: "graphql",
              description: "A GraphQL API.",
            },
            {
              name: "No APIs",
              value: "none",
              description: "Skip the API layer.",
            },
          ]}
        />

        <h2>Analytics</h2>
        <p>
          Optional analytics. See <a href="/analytics">Analytics</a>.
        </p>
        <OptionList
          options={[
            {
              name: "No Analytics",
              value: "none",
              description: "Skip analytics.",
            },
            {
              name: "Vercel Analytics",
              value: "vercel-analytics",
              description: "Vercel Web Analytics.",
            },
            {
              name: "Google Analytics",
              value: "google-analytics",
              description: "Google Analytics.",
            },
          ]}
        />

        <h2>Empty project structure</h2>
        <p>
          Generate a minimal scaffold without example/boilerplate code. Defaults
          to <strong>No</strong>.
        </p>
        <OptionList
          defaultValue="false"
          options={[
            {
              name: "No",
              value: "false",
              description: "Include the standard generated files.",
            },
            {
              name: "Yes",
              value: "true",
              description: "Generate an empty structure only.",
            },
          ]}
        />

        <h2>Skip install</h2>
        <p>
          Skip running the install step. Defaults to <strong>No</strong>. If you
          skip it, install dependencies yourself afterwards.
        </p>
        <OptionList
          defaultValue="false"
          options={[
            {
              name: "No",
              value: "false",
              description: "Install dependencies automatically.",
            },
            {
              name: "Yes",
              value: "true",
              description: "Generate files only; install later.",
            },
          ]}
        />
      </Prose>

      <DocFooter />
    </>
  );
}
