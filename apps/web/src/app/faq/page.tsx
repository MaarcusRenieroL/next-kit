import { CaretDownIcon } from "@radix-ui/react-icons";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Next CLI.",
};

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is Next CLI?",
    answer:
      "An interactive command-line tool that scaffolds a production-ready Next.js application. You choose your auth, database, ORM, API layer, payments, email, and analytics, and it generates a typed, configured project you can run immediately.",
  },
  {
    question: "How do I create a project?",
    answer:
      "Run `npx next-cli@latest` (or the equivalent for your package manager), answer the prompts, and the CLI generates and installs everything for you.",
  },
  {
    question: "Which package managers are supported?",
    answer:
      "npm, pnpm, yarn, and bun. The CLI uses the matching runner — npx, pnpm dlx, yarn dlx, or bunx — and installs dependencies with the manager you pick.",
  },
  {
    question: "Do I have to use a database?",
    answer:
      "No. Pick “No Database” and you still get a fully configured Next.js app with your chosen styling, API, and tooling.",
  },
  {
    question: "What authentication options are available?",
    answer:
      "NextAuth, Clerk, and Kinde. The CLI installs the provider, wires the routes and providers, and adds the required environment variables.",
  },
  {
    question: "Can I customize the generated project?",
    answer:
      "Yes. The output is a standard Next.js project that you fully own — there is no lock-in or runtime dependency on the CLI after generation.",
  },
  {
    question: "Is it free and open source?",
    answer:
      "Yes. Next CLI is open source on GitHub, and contributions and issues are welcome.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-100 md:text-5xl">
        Frequently asked questions
      </h1>
      <p className="mt-4 text-zinc-500 dark:text-zinc-300">
        Everything you need to know about scaffolding projects with Next CLI.
      </p>

      <div className="mt-10 divide-y rounded-xl border">
        {faqs.map(faq => (
          <details key={faq.question} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-zinc-700 dark:text-zinc-100">
              {faq.question}
              <CaretDownIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
