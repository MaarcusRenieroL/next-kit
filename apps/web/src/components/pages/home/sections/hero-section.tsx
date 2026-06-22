import { FC } from "react";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

const promptLines: { label: string; value: string }[] = [
  { label: "Project name", value: "my-app" },
  { label: "Database", value: "PostgreSQL" },
  { label: "ORM", value: "Drizzle" },
  { label: "Auth", value: "NextAuth" },
  { label: "API", value: "tRPC" },
  { label: "Payments", value: "Stripe" },
];

export const HeroSection: FC = () => {
  return (
    <div className="overflow-hidden pt-10 text-center lg:p-10">
      <div className="relative z-20 mx-auto w-full max-w-[84rem]">
        <div className="grid grid-cols-1 items-center gap-10 xl:grid-cols-2">
          <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left">
            <Badge>npx next-cli</Badge>
            <h1 className="mb-6 mt-5 max-w-4xl text-3xl font-bold text-zinc-700 dark:text-zinc-100 md:text-5xl">
              Scaffold production-grade full-stack Next.js apps in seconds
            </h1>
            <h2 className="mb-8 max-w-2xl text-sm leading-loose tracking-wide text-zinc-500 antialiased dark:text-zinc-300 sm:text-lg">
              Pick your auth, database, ORM, API layer, payments, email, and
              analytics. Next CLI wires them together into a typed, ready-to-run
              project — no boilerplate, no config grind.
            </h2>
            <div className="mb-4 flex w-full flex-col justify-center space-y-5 sm:justify-start md:flex-row md:space-x-4 md:space-y-0">
              <Link href="#quickstart">
                <Button size="lg" className="w-full md:w-fit">
                  Get Started
                </Button>
              </Link>
              <Link href="/packages">
                <Button variant="outline" size="lg" className="w-full md:w-fit">
                  Browse Packages
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-full w-full">
            <div className="absolute bottom-0 right-0 -z-10 flex h-3/4 w-[500px] items-center justify-center rounded-full bg-primary/30 blur-[120px] md:bottom-54" />
            <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border bg-zinc-950 text-left shadow-2xl">
              <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-zinc-500">
                  zsh — next-cli
                </span>
              </div>
              <div className="space-y-1.5 p-5 font-mono text-sm">
                <p className="text-zinc-400">
                  <span className="text-green-400">$</span> npx next-cli@latest
                </p>
                {promptLines.map(line => (
                  <p key={line.label} className="text-zinc-300">
                    <span className="text-green-400">✔</span> {line.label}{" "}
                    <span className="text-zinc-500">…</span>{" "}
                    <span className="text-primary">{line.value}</span>
                  </p>
                ))}
                <p className="pt-1 text-zinc-300">
                  <span className="text-yellow-400">◐</span> Scaffolding your
                  app<span className="animate-pulse">▋</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
