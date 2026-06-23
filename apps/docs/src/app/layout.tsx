import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/globals.css";
import "./docs.css";
import { DocsShell } from "@/components/docs-shell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_DOCS_URL ?? "http://localhost:3333"
  ),
  title: {
    default: "Nextkit Docs — scaffold full-stack Next.js apps",
    template: "%s | Nextkit Docs",
  },
  description:
    "Documentation for Nextkit, the interactive CLI that scaffolds production-ready Next.js apps with your choice of database, ORM, auth, API layer, payments, email, and analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-[#07070b] text-zinc-300 antialiased`}
      >
        <DocsShell>{children}</DocsShell>
      </body>
    </html>
  );
}
