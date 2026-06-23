"use client";

import { FC, useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

type CommandTabsProps = {
  /** The package/command without the runner prefix, e.g. "next-kit@latest". */
  pkg: string;
};

const runners = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx",
} as const;

type Manager = keyof typeof runners;

export const CommandTabs: FC<CommandTabsProps> = ({ pkg }) => {
  const [pm, setPm] = useState<Manager>("npm");
  const [copied, setCopied] = useState(false);

  const command = `${runners[pm]} ${pkg}`;

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70">
      <div className="flex items-center justify-between border-b border-white/5 px-2">
        <div className="flex gap-1">
          {(Object.keys(runners) as Manager[]).map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setPm(key)}
              className={`px-3 py-2 text-xs transition-colors ${
                pm === key
                  ? "border-b-2 border-indigo-400 text-indigo-200"
                  : "border-b-2 border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy command"
          className="mr-1 rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          {copied ? (
            <CheckIcon className="h-3.5 w-3.5 text-indigo-400" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-100">
        <code>
          <span className="select-none text-indigo-400">$ </span>
          {command}
        </code>
      </pre>
    </div>
  );
};
