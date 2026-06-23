"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

const steps: { label: string; options: string[] }[] = [
  { label: "Project name", options: ["my-app"] },
  { label: "Database", options: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"] },
  { label: "ORM", options: ["Drizzle", "Prisma"] },
  { label: "Auth", options: ["NextAuth", "Clerk", "Kinde"] },
  { label: "API layer", options: ["tRPC", "Hono", "GraphQL", "REST"] },
  { label: "Payments", options: ["Stripe", "Lemon Squeezy", "Razorpay"] },
];

export const Hero: FC = () => {
  // Cycle the highlighted option for each prompt to feel "interactive".
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="nk-grid pointer-events-none absolute inset-0" />
      <div className="nk-aurora pointer-events-none absolute left-1/2 top-[-16rem] h-[34rem] w-[58rem] -translate-x-1/2" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-20 lg:grid-cols-2 lg:pt-28">
        <div className="nk-fade-up">
          <Link
            href="https://github.com/MaarcusRenieroL/next-cli"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-indigo-400/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            open source · MIT licensed
          </Link>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="nk-gradient-text">A full-stack Next.js</span>
            <br />
            <span className="nk-gradient-text">app in </span>
            <span className="nk-accent-text">seconds</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
            Nextkit is an interactive CLI that scaffolds a production-ready
            Next.js project. Pick your database, ORM, auth, API layer, payments,
            email, and analytics — it wires them all together, typed and ready
            to run.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#install"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-colors hover:bg-indigo-400"
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

          <p className="mt-6 font-mono text-xs text-zinc-500">
            <span className="text-indigo-400">$</span> npx
            @mxrcxs17/next-kit@latest
          </p>
        </div>

        <div className="nk-fade-up nk-delay-2">
          <div className="nk-float overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80 shadow-2xl shadow-indigo-500/10 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2 font-mono text-xs text-zinc-500">
                zsh — next-kit
              </span>
            </div>
            <div className="space-y-1.5 p-5 font-mono text-sm">
              <p className="text-zinc-400">
                <span className="text-indigo-400">$</span> npx
                @mxrcxs17/next-kit@latest
              </p>
              {steps.map(s => {
                const value = s.options[tick % s.options.length];
                return (
                  <p key={s.label} className="text-zinc-300">
                    <span className="text-indigo-400">✔</span> {s.label}{" "}
                    <span className="text-zinc-600">…</span>{" "}
                    <span className="text-indigo-300">{value}</span>
                  </p>
                );
              })}
              <p className="pt-1 text-zinc-300">
                <span className="text-violet-400">◇</span> Scaffolding your app
                <span className="nk-caret">▋</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
