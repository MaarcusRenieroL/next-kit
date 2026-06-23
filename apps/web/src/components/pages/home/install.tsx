"use client";

import { FC, useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

const commands = {
  npm: "npx @mxrcxs17/next-kit@latest",
  pnpm: "pnpm dlx @mxrcxs17/next-kit@latest",
  yarn: "yarn dlx @mxrcxs17/next-kit@latest",
  bun: "bunx @mxrcxs17/next-kit@latest",
} as const;

type PackageManager = keyof typeof commands;

export const Install: FC = () => {
  const [pm, setPm] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(commands[pm]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="install" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="nk-gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
          One command to begin
        </h2>
        <p className="mt-4 text-zinc-400">
          No global install. Run it, answer a few prompts, and start building.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <div className="mb-3 flex justify-center gap-1.5">
            {(Object.keys(commands) as PackageManager[]).map(key => (
              <button
                key={key}
                type="button"
                onClick={() => setPm(key)}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  pm === key
                    ? "bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-zinc-950/80 px-5 py-4 text-left">
            <code className="overflow-x-auto font-mono text-sm text-zinc-100">
              <span className="text-indigo-400">$</span> {commands[pm]}
            </code>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy install command"
              className="shrink-0 rounded-md p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {copied ? (
                <CheckIcon className="h-4 w-4 text-indigo-400" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
