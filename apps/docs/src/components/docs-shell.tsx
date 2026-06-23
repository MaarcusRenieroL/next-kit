"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GitHubLogoIcon,
  HamburgerMenuIcon,
  Cross1Icon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import { nav } from "@/lib/nav";

const REPO = "https://github.com/MaarcusRenieroL/next-cli";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://next-kit.maarcus.dev";

const SidebarNav: FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  const pathname = usePathname();
  return (
    <nav className="space-y-7">
      {nav.map(group => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map(item => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-indigo-500/15 font-medium text-indigo-200 ring-1 ring-inset ring-indigo-500/25"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export const DocsShell: FC<{ children: ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen">
      {/* Topbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#07070b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle navigation"
              className="grid h-9 w-9 place-items-center rounded-md text-zinc-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            >
              {mobileOpen ? (
                <Cross1Icon className="h-4 w-4" />
              ) : (
                <HamburgerMenuIcon className="h-4 w-4" />
              )}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-indigo-500/15 font-mono text-sm font-bold text-indigo-300 ring-1 ring-indigo-500/30">
                {">_"}
              </span>
              <span className="font-semibold tracking-tight text-white">
                Nextkit
              </span>
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                Docs
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={SITE_URL}
              className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white sm:inline-flex"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" /> Back to site
            </Link>
            <Link
              href={REPO}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-md text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <GitHubLogoIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[88rem] px-4 sm:px-6">
        {/* Desktop sidebar */}
        <aside className="nk-scroll sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto py-8 pr-4 lg:block">
          <SidebarNav />
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="nk-scroll absolute left-0 top-16 h-[calc(100vh-4rem)] w-72 overflow-y-auto border-r border-white/10 bg-[#0b0b11] p-6">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Content */}
        <main className="min-w-0 flex-1 py-10 lg:pl-10">{children}</main>
      </div>
    </div>
  );
};
