// @ts-nocheck
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>
        Welcome to your <span style={{ color: "#0070f3" }}>Next.js</span> app
      </h1>
      <p style={{ maxWidth: "32rem", color: "#666" }}>
        Generated with next-cli. Edit <code>app/page.tsx</code> to get started.
      </p>
      <Link href="https://nextjs.org/docs" target="_blank" style={{ color: "#0070f3" }}>
        Read the Next.js docs →
      </Link>
    </main>
  );
}
