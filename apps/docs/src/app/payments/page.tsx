import { PageHeader, Prose, OptionList, Callout } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Payments" };

export default function PaymentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your stack"
        title="Payments"
        lead="Optionally add a payment provider. This prompt appears when you've selected a database."
      />

      <Prose>
        <h2>Available providers</h2>
      </Prose>

      <OptionList
        options={[
          {
            name: "Stripe",
            value: "stripe",
            description:
              "Card payments, subscriptions, and billing — the most widely used option.",
          },
          {
            name: "PayPal",
            value: "paypal",
            description: "PayPal checkout for one-time and recurring payments.",
          },
          {
            name: "Lemon Squeezy",
            value: "lemon-squeezy",
            description:
              "A merchant of record that handles sales tax and compliance for you.",
          },
          {
            name: "Razorpay",
            value: "razorpay",
            description: "Payments tailored for India and other regions.",
          },
          {
            name: "No Payment Service",
            value: "none",
            description: "Skip payments.",
          },
        ]}
      />

      <Prose>
        <Callout type="note" title="Requires a database">
          Payments are offered only when a <a href="/database">database</a> is
          selected, since orders and subscriptions are typically persisted.
        </Callout>

        <h2>What gets configured</h2>
        <ul>
          <li>The provider&apos;s SDK installed.</li>
          <li>Placeholder environment variables for the API keys.</li>
        </ul>

        <h2>Environment variables</h2>
        <p>
          Add your provider&apos;s keys (and webhook secret, where applicable)
          to the env file before processing payments. Use test keys during
          development and switch to live keys for production.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
