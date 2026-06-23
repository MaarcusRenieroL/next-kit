import { PageHeader, Prose, OptionList, Callout } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Authentication" };

export default function AuthenticationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your stack"
        title="Authentication"
        lead="Add user authentication to your app. Nextkit installs the provider and wires the routes, providers, and environment variables for you."
      />

      <Prose>
        <h2>Available providers</h2>
      </Prose>

      <OptionList
        defaultValue="next-auth"
        options={[
          {
            name: "NextAuth",
            value: "next-auth",
            description:
              "Self-hosted authentication for Next.js. The default when a database is selected.",
          },
          {
            name: "Clerk",
            value: "clerk",
            description:
              "A managed user-management service with prebuilt UI components.",
          },
          {
            name: "Kinde",
            value: "kinde",
            description: "A managed auth and user-access platform.",
          },
          {
            name: "No Authentication",
            value: "none",
            description: "Skip authentication.",
          },
        ]}
      />

      <Prose>
        <Callout type="warning" title="NextAuth needs a database">
          NextAuth persists sessions and accounts, so it&apos;s only offered
          when you&apos;ve chosen a <a href="/database">database</a>. If you
          select <strong>No Database</strong>, your options are Clerk, Kinde, or
          none — both Clerk and Kinde store users on their own platform.
        </Callout>

        <h2>What gets wired up</h2>
        <ul>
          <li>The provider&apos;s SDK installed and configured.</li>
          <li>The route handlers and client providers needed for sessions.</li>
          <li>
            Placeholder environment variables for the keys each provider
            requires.
          </li>
        </ul>

        <h2>Environment variables</h2>
        <p>
          Fill in the credentials before signing in. As a rough guide: NextAuth
          needs a secret and any OAuth provider keys you enable; Clerk and Kinde
          need the publishable/secret keys and URLs from their dashboards. Check
          the generated env file for the exact names.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
