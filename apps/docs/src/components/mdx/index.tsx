import { FC, ReactNode } from "react";
import {
  InfoCircledIcon,
  ExclamationTriangleIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";

/** Page title + lead paragraph shown at the top of every doc page. */
export const PageHeader: FC<{
  eyebrow?: string;
  title: string;
  lead?: string;
}> = ({ eyebrow, title, lead }) => (
  <div className="mb-8">
    {eyebrow && (
      <p className="mb-2 text-sm font-medium text-indigo-400">{eyebrow}</p>
    )}
    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
      <span className="nk-gradient-text">{title}</span>
    </h1>
    {lead && (
      <p className="mt-4 text-lg leading-relaxed text-zinc-400">{lead}</p>
    )}
  </div>
);

/** Wrap long-form content so the prose styles apply. */
export const Prose: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="nk-prose max-w-3xl">{children}</div>
);

type CalloutType = "note" | "warning" | "tip";

const calloutStyles: Record<
  CalloutType,
  { ring: string; text: string; icon: ReactNode; label: string }
> = {
  note: {
    ring: "border-indigo-500/30 bg-indigo-500/5",
    text: "text-indigo-200",
    icon: <InfoCircledIcon className="h-4 w-4" />,
    label: "Note",
  },
  tip: {
    ring: "border-cyan-500/30 bg-cyan-500/5",
    text: "text-cyan-200",
    icon: <LightningBoltIcon className="h-4 w-4" />,
    label: "Tip",
  },
  warning: {
    ring: "border-amber-500/30 bg-amber-500/5",
    text: "text-amber-200",
    icon: <ExclamationTriangleIcon className="h-4 w-4" />,
    label: "Warning",
  },
};

export const Callout: FC<{
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}> = ({ type = "note", title, children }) => {
  const s = calloutStyles[type];
  return (
    <div className={`my-5 rounded-xl border px-4 py-3.5 ${s.ring}`}>
      <div
        className={`mb-1 flex items-center gap-2 text-sm font-semibold ${s.text}`}
      >
        {s.icon}
        {title ?? s.label}
      </div>
      <div className="text-sm leading-relaxed text-zinc-300 [&_a]:text-indigo-300 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs">
        {children}
      </div>
    </div>
  );
};

/** Numbered step list for sequential instructions. */
export const Steps: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="my-6 space-y-6 border-l border-white/10 pl-8">{children}</div>
);

export const Step: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <div className="relative">
    <span className="absolute -left-[3.05rem] grid h-7 w-7 place-items-center rounded-full border border-indigo-500/40 bg-[#07070b] text-xs font-bold text-indigo-300">
      •
    </span>
    <h3 className="mb-1 text-base font-semibold text-white">{title}</h3>
    <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
  </div>
);

/** A labelled list of selectable options for a prompt / stack layer. */
export const OptionList: FC<{
  options: { name: string; value: string; description: string }[];
  defaultValue?: string;
}> = ({ options, defaultValue }) => (
  <div className="my-5 overflow-hidden rounded-xl border border-white/10">
    {options.map((o, i) => (
      <div
        key={o.value}
        className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${
          i !== 0 ? "border-t border-white/5" : ""
        }`}
      >
        <div className="flex shrink-0 items-center gap-2 sm:w-44">
          <span className="font-medium text-white">{o.name}</span>
          {o.value === defaultValue && (
            <span className="rounded bg-indigo-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-indigo-300">
              default
            </span>
          )}
        </div>
        <span className="text-sm text-zinc-400">{o.description}</span>
      </div>
    ))}
  </div>
);

/** Simple linked card grid used on the introduction page. */
export const CardGrid: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="my-6 grid gap-4 sm:grid-cols-2">{children}</div>
);

import Link from "next/link";

export const Card: FC<{ title: string; href: string; children: ReactNode }> = ({
  title,
  href,
  children,
}) => (
  <Link href={href} className="nk-card block p-5">
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <p className="mt-1 text-sm text-zinc-400">{children}</p>
  </Link>
);
