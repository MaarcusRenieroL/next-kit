import { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";

const groups: { title: string; items: string[] }[] = [
  { title: "Authentication", items: ["NextAuth", "Clerk", "Kinde"] },
  { title: "Database", items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"] },
  { title: "ORM", items: ["Prisma", "Drizzle"] },
  { title: "API layer", items: ["tRPC", "GraphQL", "Hono", "REST"] },
  {
    title: "Payments",
    items: ["Stripe", "Paypal", "Lemon Squeezy", "Razorpay"],
  },
  { title: "Email", items: ["Resend", "SendGrid", "Mailgun", "Postmark"] },
  { title: "Analytics", items: ["Vercel", "Google Analytics"] },
  { title: "Styling", items: ["Tailwind CSS", "shadcn/ui"] },
];

export const IntegrationsSection: FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden md:px-4 lg:p-10 lg:px-8">
      <h2 className="mb-6 mt-5 max-w-4xl text-3xl font-bold text-zinc-700 dark:text-zinc-100 md:text-5xl">
        Everything wired for you
      </h2>
      <p className="mb-10 max-w-2xl text-center text-zinc-500 dark:text-zinc-300">
        Choose from a curated set of tools for every layer of your stack. Next
        CLI installs them, configures the env, and connects the pieces.
      </p>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map(group => (
          <Card key={group.title} className="h-full w-full">
            <CardHeader>
              <CardTitle className="text-primary">{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {group.items.map(item => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
