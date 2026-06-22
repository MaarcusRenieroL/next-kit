"use client";

import { FC, useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

const commands = {
  npm: "npx next-cli@latest",
  pnpm: "pnpm dlx next-cli@latest",
  yarn: "yarn dlx next-cli@latest",
  bun: "bunx next-cli@latest",
} as const;

type PackageManager = keyof typeof commands;

export const QuickstartSection: FC = () => {
  const [pm, setPm] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(commands[pm]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      id="quickstart"
      className="flex h-full w-full scroll-mt-24 flex-col items-center justify-center overflow-hidden md:px-4 lg:p-10 lg:px-8"
    >
      <h1 className="mb-6 mt-5 max-w-4xl text-3xl font-bold text-zinc-700 dark:text-zinc-100 md:text-5xl">
        Get started in one command
      </h1>
      <p className="mb-8 max-w-2xl text-center text-zinc-500 dark:text-zinc-300">
        Run it, answer a few prompts, and start building. No setup, no
        configuration grind.
      </p>

      <div className="w-full max-w-2xl">
        <div className="mb-3 flex flex-wrap gap-2">
          {(Object.keys(commands) as PackageManager[]).map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setPm(key)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors",
                pm === key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-transparent text-muted-foreground hover:bg-secondary"
              )}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border bg-zinc-950 px-5 py-4">
          <code className="overflow-x-auto font-mono text-sm text-zinc-100">
            <span className="text-green-400">$</span> {commands[pm]}
          </code>
          <Button
            variant="ghost"
            size="icon"
            onClick={copy}
            aria-label="Copy install command"
            className="shrink-0 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-green-400" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
