import { PageHeader, Prose, OptionList, Callout } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Styling & UI" };

export default function StylingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your stack"
        title="Styling & UI"
        lead="Nextkit sets up styling and an optional component library so your project looks good from the first render."
      />

      <Prose>
        <h2>Tailwind CSS</h2>
        <p>
          Tailwind is enabled by default. When on, Nextkit adds the Tailwind
          config, the PostCSS setup, and the global stylesheet with
          Tailwind&apos;s layers imported. You can opt out at the{" "}
          <a href="/cli-options">Tailwind prompt</a>.
        </p>

        <h2>UI library</h2>
      </Prose>

      <OptionList
        defaultValue="shadcn-ui"
        options={[
          {
            name: "shadcn/ui",
            value: "shadcn-ui",
            description:
              "Accessible, unstyled-by-default components you copy into your project and own. The default.",
          },
          {
            name: "No UI Library",
            value: "none",
            description:
              "Just Tailwind (or plain CSS), with no component library.",
          },
        ]}
      />

      <Prose>
        <Callout type="tip" title="shadcn/ui pairs with Tailwind">
          shadcn/ui is built on Tailwind, so keep Tailwind enabled to get the
          most out of it. The components live in your codebase, so you can
          restyle them freely.
        </Callout>

        <h2>The cn() helper</h2>
        <p>
          Generated projects include a <code>cn()</code> utility (in{" "}
          <code>libs/utils.ts</code>) that merges Tailwind class names safely —
          the same helper shadcn/ui components rely on.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
