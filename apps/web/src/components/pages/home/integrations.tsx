import { FC } from "react";

const marquee = [
  "Next.js",
  "TypeScript",
  "Prisma",
  "Drizzle",
  "tRPC",
  "GraphQL",
  "Hono",
  "Stripe",
  "NextAuth",
  "Clerk",
  "Kinde",
  "Tailwind",
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "Resend",
  "SendGrid",
  "Vercel",
];

const groups: { title: string; items: string[] }[] = [
  { title: "Auth", items: ["NextAuth", "Clerk", "Kinde"] },
  { title: "Database", items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"] },
  { title: "ORM", items: ["Prisma", "Drizzle"] },
  { title: "API", items: ["tRPC", "GraphQL", "Hono", "REST"] },
  {
    title: "Payments",
    items: ["Stripe", "Paypal", "Lemon Squeezy", "Razorpay"],
  },
  { title: "Email", items: ["Resend", "SendGrid", "Mailgun", "Postmark"] },
  { title: "Analytics", items: ["Vercel", "Google"] },
  { title: "Styling", items: ["Tailwind CSS", "shadcn/ui"] },
];

export const Integrations: FC = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="text-sm font-medium text-indigo-400">Your stack</span>
        <h2 className="nk-gradient-text mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Pick from a curated menu
        </h2>
        <p className="mt-4 text-zinc-400">
          Every layer of the stack — installed and configured for you.
        </p>
      </div>

      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="nk-marquee flex w-max gap-3">
          {[...marquee, ...marquee].map((m, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map(g => (
          <div key={g.title} className="nk-card p-5">
            <h3 className="text-sm font-semibold text-indigo-300">{g.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map(it => (
                <span
                  key={it}
                  className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
