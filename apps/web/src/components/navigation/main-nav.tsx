"use client";

import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const MainNav: FC = () => {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <span className="hidden font-bold lg:inline-block text-2xl uppercase">
          Next CLI
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80 text-foreground/60",
            pathname === "/docs"
              ? "underline underline-offset-4"
              : "text-muted-foreground"
          )}
        >
          Docs
        </Link>
        <Link
          href="/packages"
          className={cn(
            "transition-colors text-foreground/60 hover:text-foreground/80",
            pathname === "/packages"
              ? "underline underline-offset-4"
              : "text-muted-foreground"
          )}
        >
          Packages
        </Link>
        <Link
          href="/faq"
          className={cn(
            "transition-colors text-foreground/60 hover:text-foreground/80",
            pathname === "/faq"
              ? "underline underline-offset-4"
              : "text-muted-foreground"
          )}
        >
          FAQ
        </Link>
      </nav>
    </div>
  );
};
