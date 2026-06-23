import { PageHeader } from "@/components/mdx";
import { DocFooter } from "@/components/mdx/doc-footer";

export const metadata = { title: "FAQ" };

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is Nextkit?",
    a: (
      <p>
        An interactive command-line tool that scaffolds a production-ready
        Next.js application. You choose your database, ORM, auth, API layer,
        payments, email, and analytics, and it generates a typed, configured
        project you can run immediately.
      </p>
    ),
  },
  {
    q: "How do I create a project?",
    a: (
      <p>
        Run <code>npx next-kit@latest</code> (or the equivalent for your package
        manager), answer the prompts, and the CLI generates and installs
        everything for you. See <a href="/quickstart">Quickstart</a>.
      </p>
    ),
  },
  {
    q: "Which package managers are supported?",
    a: (
      <p>
        npm, pnpm, yarn, and bun. The CLI uses the matching runner —{" "}
        <code>npx</code>, <code>pnpm dlx</code>, <code>yarn dlx</code>, or{" "}
        <code>bunx</code> — and installs dependencies with the manager you pick.
      </p>
    ),
  },
  {
    q: "Do I have to use a database?",
    a: (
      <p>
        No. Pick <strong>No Database</strong> and you still get a fully
        configured Next.js app with your chosen styling, API, and tooling. Note
        that the ORM and payments prompts are skipped, and NextAuth isn&apos;t
        available without a database.
      </p>
    ),
  },
  {
    q: "What authentication options are available?",
    a: (
      <p>
        NextAuth, Clerk, and Kinde. NextAuth requires a database; Clerk and
        Kinde do not. See <a href="/authentication">Authentication</a>.
      </p>
    ),
  },
  {
    q: "Can I customize the generated project?",
    a: (
      <p>
        Yes. The output is a standard Next.js project that you fully own — there
        is no lock-in or runtime dependency on the CLI after generation.
      </p>
    ),
  },
  {
    q: "Is it free and open source?",
    a: (
      <p>
        Yes. Nextkit is open source on{" "}
        <a
          href="https://github.com/MaarcusRenieroL/next-cli"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        , and contributions and issues are welcome.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference"
        title="FAQ"
        lead="Quick answers to the most common questions about Nextkit."
      />

      <div className="max-w-3xl divide-y divide-white/5 overflow-hidden rounded-xl border border-white/10">
        {faqs.map(faq => (
          <details key={faq.q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-zinc-100">
              {faq.q}
              <span className="text-zinc-500 transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="nk-prose mt-3 !text-sm">{faq.a}</div>
          </details>
        ))}
      </div>

      <DocFooter />
    </>
  );
}
