import { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

const prompts: { label: string; value: string }[] = [
  { label: "Project name", value: "my-app" },
  { label: "Database", value: "PostgreSQL" },
  { label: "ORM", value: "Drizzle" },
  { label: "Auth", value: "NextAuth" },
  { label: "API", value: "tRPC" },
  { label: "Payments", value: "Stripe" },
];

export const Hero: FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="nc-grid pointer-events-none absolute inset-0" />
      <div className="nc-glow pointer-events-none absolute left-1/2 top-[-12rem] h-[30rem] w-[46rem] -translate-x-1/2" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-20 lg:grid-cols-2 lg:pt-28">
        <div className="nc-fade-up">
          <Link
            href="https://github.com/MaarcusRenieroL/next-cli"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-emerald-500/40"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            open source · MIT licensed
          </Link>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="nc-gradient-text">Scaffold full-stack</span>
            <br />
            <span className="nc-gradient-text">Next.js apps in </span>
            <span className="text-emerald-400">seconds</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
            One command. Pick your auth, database, ORM, API layer, payments,
            email, and analytics — next-cli wires them into a typed,
            ready-to-run project.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#install"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400"
            >
              Get started <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/MaarcusRenieroL/next-cli"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
            >
              <GitHubLogoIcon className="h-4 w-4" /> Star on GitHub
            </Link>
          </div>
        </div>

        <div className="nc-fade-up nc-delay-2">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2 font-mono text-xs text-zinc-500">
                zsh — next-cli
              </span>
            </div>
            <div className="space-y-1.5 p-5 font-mono text-sm">
              <p className="text-zinc-400">
                <span className="text-emerald-400">$</span> npx next-cli@latest
              </p>
              {prompts.map(p => (
                <p key={p.label} className="text-zinc-300">
                  <span className="text-emerald-400">✔</span> {p.label}{" "}
                  <span className="text-zinc-600">…</span>{" "}
                  <span className="text-emerald-300">{p.value}</span>
                </p>
              ))}
              <p className="pt-1 text-zinc-300">
                <span className="text-emerald-400">◇</span> Scaffolding your app
                <span className="nc-caret">▋</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
