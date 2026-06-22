import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

export const metadata = {
  title: "Docs",
  description: "Documentation for Next CLI.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 text-center">
      <Badge>Coming soon</Badge>
      <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-100 md:text-4xl">
        Documentation is on the way
      </h1>
      <p className="max-w-xl text-zinc-500 dark:text-zinc-300">
        Full docs are being written. In the meantime, the quickest way to get
        going is the command below, and the README covers every option the CLI
        supports.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/#quickstart">
          <Button size="lg" className="w-full sm:w-fit">
            Quickstart
          </Button>
        </Link>
        <Link
          href="https://github.com/MaarcusRenieroL/next-cli#readme"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" size="lg" className="w-full sm:w-fit">
            Read the README
          </Button>
        </Link>
      </div>
    </div>
  );
}
