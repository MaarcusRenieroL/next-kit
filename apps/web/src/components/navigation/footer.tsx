import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const REPO = "https://github.com/MaarcusRenieroL/next-cli";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded bg-emerald-500/15 font-mono text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/30">
            {">_"}
          </span>
          <span className="text-sm text-zinc-500">
            next-cli — scaffold full-stack Next.js apps in seconds.
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/docs" className="transition-colors hover:text-white">
            Docs
          </Link>
          <Link href="/packages" className="transition-colors hover:text-white">
            Packages
          </Link>
          <Link href="/faq" className="transition-colors hover:text-white">
            FAQ
          </Link>
          <Link
            href={REPO}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-white"
          >
            <GitHubLogoIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-zinc-600">
        Built by{" "}
        <Link
          href="https://github.com/MaarcusRenieroL"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-400 transition-colors hover:text-white"
        >
          Maarcus Reniero L
        </Link>{" "}
        and{" "}
        <Link
          href="https://github.com/anonymous-sherlock"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-400 transition-colors hover:text-white"
        >
          Akash Layal
        </Link>
        . MIT licensed.
      </div>
    </footer>
  );
};
