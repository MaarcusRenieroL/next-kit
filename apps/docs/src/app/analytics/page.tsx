import { PageHeader, Prose, OptionList } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your stack"
        title="Analytics"
        lead="Optionally add web analytics to understand how your app is used."
      />

      <Prose>
        <h2>Available providers</h2>
      </Prose>

      <OptionList
        options={[
          {
            name: "Vercel Analytics",
            value: "vercel-analytics",
            description:
              "Privacy-friendly Web Analytics that works out of the box when deployed on Vercel.",
          },
          {
            name: "Google Analytics",
            value: "google-analytics",
            description:
              "Google Analytics for detailed traffic and behaviour reporting.",
          },
          {
            name: "No Analytics",
            value: "none",
            description: "Skip analytics.",
          },
        ]}
      />

      <Prose>
        <h2>What gets configured</h2>
        <ul>
          <li>The analytics script or SDK added to your app.</li>
          <li>
            Any required identifier as an environment variable (for example a
            Google Analytics measurement ID).
          </li>
        </ul>

        <p>
          Vercel Analytics needs no extra keys when deployed on Vercel. For
          Google Analytics, add your measurement ID to the env file.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
