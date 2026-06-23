"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { getAdjacent } from "@/lib/nav";

export const DocFooter: FC = () => {
  const pathname = usePathname();
  const { prev, next } = getAdjacent(pathname);

  if (!prev && !next) return null;

  return (
    <div className="mt-14 flex items-stretch justify-between gap-4 border-t border-white/5 pt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="nk-card group flex flex-1 flex-col items-start p-4"
        >
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <ArrowLeftIcon className="h-3 w-3" /> Previous
          </span>
          <span className="mt-1 font-medium text-zinc-200 group-hover:text-white">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="nk-card group flex flex-1 flex-col items-end p-4 text-right"
        >
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            Next <ArrowRightIcon className="h-3 w-3" />
          </span>
          <span className="mt-1 font-medium text-zinc-200 group-hover:text-white">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};
