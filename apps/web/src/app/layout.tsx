import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/globals.css";
import "./landing.css";
import { Navbar } from "@/components/navigation/navbar";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/navigation/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  title: {
    default: "Nextkit — scaffold full-stack Next.js apps in seconds",
    template: "%s | Nextkit",
  },
  description:
    "Nextkit is an interactive CLI that scaffolds production-ready Next.js apps with your choice of auth, ORM, database, API layer, payments, email, and analytics — wired up in seconds.",
  keywords: [
    "next.js",
    "cli",
    "scaffold",
    "boilerplate",
    "starter",
    "typescript",
    "t3",
    "nextkit",
  ],
  openGraph: {
    title: "Nextkit",
    description:
      "Scaffold production-ready full-stack Next.js apps in seconds.",
    url: "/",
    siteName: "Nextkit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nextkit",
    description:
      "Scaffold production-ready full-stack Next.js apps in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} relative min-h-screen bg-[#08080a] text-zinc-300 antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
