"use client";

import { FC, useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

type CodeBlockProps = {
  code: string;
  /** Optional label shown in the title bar, e.g. a filename. */
  title?: string;
  /** Render a leading `$` prompt for shell commands. */
  shell?: boolean;
};

export const CodeBlock: FC<CodeBlockProps> = ({ code, title, shell }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70">
      {title && (
        <div className="border-b border-white/5 px-4 py-2 font-mono text-xs text-zinc-500">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className="nk-scroll overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-100">
          <code>
            {code.split("\n").map((line, i) => (
              <span key={i} className="block">
                {shell && line.trim() !== "" && (
                  <span className="select-none text-indigo-400">$ </span>
                )}
                {line}
              </span>
            ))}
          </code>
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="absolute right-2.5 top-2.5 rounded-md border border-white/10 bg-white/5 p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <CheckIcon className="h-3.5 w-3.5 text-indigo-400" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
