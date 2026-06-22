import { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

export const Cta: FC = () => {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-16 text-center">
        <div className="nc-glow pointer-events-none absolute left-1/2 top-[-8rem] h-[20rem] w-[28rem] -translate-x-1/2" />
        <h2 className="nc-gradient-text relative text-3xl font-bold tracking-tight sm:text-5xl">
          Ship your next idea today
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">
          Stop wiring up the same stack every time. Scaffold a production-ready
          Next.js app in seconds.
        </p>
        <div className="relative mx-auto mt-8 w-fit rounded-lg border border-white/10 bg-zinc-950/80 px-5 py-3 font-mono text-sm text-zinc-100">
          <span className="text-emerald-400">$</span> npx next-cli@latest
        </div>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
            <GitHubLogoIcon className="h-4 w-4" /> GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};
