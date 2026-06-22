import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@repo/ui/globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/navigation/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  title: {
    default: "Next CLI — scaffold full-stack Next.js apps in seconds",
    template: "%s | Next CLI",
  },
  description:
    "An interactive CLI that scaffolds production-ready Next.js apps with your choice of auth, ORM, database, API layer, payments, email, and analytics — wired up in seconds.",
  keywords: [
    "next.js",
    "cli",
    "scaffold",
    "boilerplate",
    "starter",
    "typescript",
    "t3",
  ],
  openGraph: {
    title: "Next CLI",
    description:
      "Scaffold production-ready full-stack Next.js apps in seconds.",
    url: "/",
    siteName: "Next CLI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next CLI",
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
    <html lang="en">
      <body className={`${poppins.className} antialiased relative`}>
        <Providers>
          <Navbar />
          <main className="px-6 py-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
