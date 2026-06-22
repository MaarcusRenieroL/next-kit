import { FC } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";

export const CtaSection: FC = () => {
  return (
    <div className="px-4 lg:px-8">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-2xl border bg-card p-10 text-center">
        <div className="absolute -top-24 left-1/2 -z-10 h-48 w-[480px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <h2 className="max-w-2xl text-3xl font-bold text-zinc-700 dark:text-zinc-100 md:text-4xl">
          Ship your next idea faster
        </h2>
        <p className="max-w-xl text-zinc-500 dark:text-zinc-300">
          Stop wiring up the same stack every time. Scaffold a production-ready
          Next.js app in seconds.
        </p>
        <code className="rounded-lg border bg-zinc-950 px-5 py-3 font-mono text-sm text-zinc-100">
          <span className="text-green-400">$</span> npx next-cli@latest
        </code>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="#quickstart">
            <Button size="lg" className="w-full sm:w-fit">
              Get started
            </Button>
          </Link>
          <Link
            href="https://github.com/MaarcusRenieroL/next-cli"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="lg" className="w-full sm:w-fit">
              Star on GitHub
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
