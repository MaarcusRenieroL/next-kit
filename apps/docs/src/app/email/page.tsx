import { PageHeader, Prose, OptionList, Callout } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Email" };

export default function EmailPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your stack"
        title="Email"
        lead="Add a transactional email provider for things like sign-in links, receipts, and notifications."
      />

      <Prose>
        <h2>Available providers</h2>
      </Prose>

      <OptionList
        defaultValue="resend"
        options={[
          {
            name: "Resend",
            value: "resend",
            description:
              "A developer-first email API with a clean SDK and React email support. The default.",
          },
          {
            name: "Mailgun",
            value: "mailgun",
            description: "A long-established email delivery service.",
          },
          {
            name: "SendGrid",
            value: "sendgrid",
            description: "Email delivery built for scale.",
          },
          {
            name: "Postmark",
            value: "postmark",
            description: "Fast, reliable transactional email.",
          },
          {
            name: "No Email Package",
            value: "none",
            description: "Skip email.",
          },
        ]}
      />

      <Prose>
        <Callout type="tip" title="Getting started fast">
          Resend is the default for a reason — it has the smoothest setup and
          pairs nicely with React-based email templates.
        </Callout>

        <h2>What gets configured</h2>
        <ul>
          <li>The provider&apos;s SDK installed.</li>
          <li>Placeholder environment variables for your API key.</li>
        </ul>

        <h2>Environment variables</h2>
        <p>
          Add your provider&apos;s API key to the env file, and verify a sending
          domain or address in the provider&apos;s dashboard before sending mail
          in production.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
