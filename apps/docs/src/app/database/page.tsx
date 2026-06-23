import { PageHeader, Prose, OptionList, Callout } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "Database" };

export default function DatabasePage() {
  return (
    <>
      <PageHeader
        eyebrow="Your stack"
        title="Database"
        lead="Choose the database your app will use. Nextkit configures the connection and, if you pick an ORM, the schema and client too."
      />

      <Prose>
        <h2>Available providers</h2>
      </Prose>

      <OptionList
        defaultValue="postgresql"
        options={[
          {
            name: "PostgreSQL",
            value: "postgresql",
            description:
              "A robust relational database — the default and a great choice for most apps.",
          },
          {
            name: "MySQL",
            value: "mysql",
            description: "A popular relational database.",
          },
          {
            name: "SQLite",
            value: "sqlite",
            description:
              "A zero-config, file-based relational database, ideal for local development.",
          },
          {
            name: "MongoDB",
            value: "mongodb",
            description: "A document database for flexible, schema-less data.",
          },
          {
            name: "No Database",
            value: "none",
            description: "Scaffold without a database.",
          },
        ]}
      />

      <Prose>
        <Callout
          type="note"
          title="Choosing the database affects later prompts"
        >
          When you select a database, Nextkit also asks for an{" "}
          <a href="/orm">ORM</a> and a <a href="/payments">payment provider</a>.
          Choosing <strong>No Database</strong> skips those, and limits{" "}
          <a href="/authentication">authentication</a> to Clerk, Kinde, or none.
        </Callout>

        <h2>Connecting</h2>
        <p>
          The generated project reads its connection string from an environment
          variable (for example <code>DATABASE_URL</code>). Set it to point at
          your database before running migrations or queries. For local
          development, SQLite needs no server — it&apos;s the quickest way to
          get going.
        </p>

        <h2>Next step</h2>
        <p>
          Pair your database with an ORM for type-safe queries and migrations —
          see <a href="/orm">ORM</a>.
        </p>
      </Prose>

      <DocFooter />
    </>
  );
}
