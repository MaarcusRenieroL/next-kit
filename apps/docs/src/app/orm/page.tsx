import { PageHeader, Prose, OptionList, Callout } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "ORM" };

export default function OrmPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your stack"
        title="ORM"
        lead="An ORM gives you type-safe database access and migrations. This prompt only appears when you've selected a database."
      />

      <Prose>
        <h2>Available ORMs</h2>
      </Prose>

      <OptionList
        defaultValue="prisma"
        options={[
          {
            name: "Prisma",
            value: "prisma",
            description:
              "A mature, type-safe ORM with a declarative schema and a migration workflow. The default.",
          },
          {
            name: "Drizzle",
            value: "drizzle",
            description:
              "A lightweight, SQL-first ORM with TypeScript-defined schemas and a thin runtime.",
          },
          {
            name: "No ORM",
            value: "none",
            description: "Use the database directly without an ORM layer.",
          },
        ]}
      />

      <Prose>
        <Callout type="tip" title="Prisma vs Drizzle">
          Prisma is a great default — its schema and generated client are easy
          to work with. Reach for Drizzle if you prefer writing close to SQL,
          want a smaller runtime, or value fully TypeScript-native schema
          definitions.
        </Callout>

        <h2>What gets configured</h2>
        <ul>
          <li>A schema file matched to your chosen database provider.</li>
          <li>A preconfigured client you can import across the app.</li>
          <li>
            The scripts and config needed to generate the client and run
            migrations.
          </li>
        </ul>

        <h2>After generation</h2>
        <p>
          Set your <code>DATABASE_URL</code>, define your models in the schema,
          then run your ORM&apos;s generate/migrate commands. Prisma uses{" "}
          <code>prisma migrate</code> and <code>prisma generate</code>; Drizzle
          uses <code>drizzle-kit</code> to generate and push migrations.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
