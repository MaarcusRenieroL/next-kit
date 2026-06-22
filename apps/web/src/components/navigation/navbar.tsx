import Link from "next/link";
import { FC } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const links = [
  { href: "/docs", label: "Docs" },
  { href: "/packages", label: "Packages" },
  { href: "/faq", label: "FAQ" },
];

export const Navbar: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#08080a]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald-500/15 font-mono text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/30">
            {">_"}
          </span>
          <span className="font-semibold tracking-tight text-white">
            next-cli
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/MaarcusRenieroL/next-cli"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-md text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <GitHubLogoIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/#install"
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
};
