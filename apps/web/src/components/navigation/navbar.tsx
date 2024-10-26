import Link from "next/link";
import { FC } from "react";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { CommandMenu } from "../command-menu";
import { cn } from "@repo/ui/lib/utils";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "../themes/theme-toggle";

export const Navbar: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 h-20 border-b bg-background flex items-center">
      <div className="flex h-14 w-full items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-5 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center space-x-5">
            <Link
              href="https://github.com/MaarcusRenieroL/next-cli"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "h-8 w-8 px-0"
                )}
              >
                <GitHubLogoIcon className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
