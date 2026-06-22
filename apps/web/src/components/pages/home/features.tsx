import { FC, ReactNode } from "react";
import {
  CheckCircledIcon,
  LightningBoltIcon,
  LockClosedIcon,
  MixIcon,
} from "@radix-ui/react-icons";

type CardProps = {
  icon: ReactNode;
  title: string;
  body: string;
  className?: string;
};

const Card: FC<CardProps> = ({ icon, title, body, className = "" }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 ${className}`}
  >
    <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
      {icon}
    </div>
    <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
  </div>
);

export const Features: FC = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="nc-gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
            Built for momentum
          </h2>
          <p className="mt-4 text-zinc-400">
            Stop gluing the same tools together on every new project.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Card
            className="md:col-span-2"
            icon={<LightningBoltIcon className="h-5 w-5" />}
            title="One command, full stack"
            body="Answer a handful of prompts and get a complete Next.js app — routes, providers, env, and dependencies all configured and connected for you."
          />
          <Card
            icon={<MixIcon className="h-5 w-5" />}
            title="Modular by design"
            body="Mix and match auth, ORM, database, API, payments, email, and analytics. Take only what you need."
          />
          <Card
            icon={<CheckCircledIcon className="h-5 w-5" />}
            title="Typed end-to-end"
            body="Strict TypeScript throughout, with validated environment variables out of the box."
          />
          <Card
            className="md:col-span-2"
            icon={<LockClosedIcon className="h-5 w-5" />}
            title="Your code, no lock-in"
            body="The output is a standard Next.js project you fully own. There's no runtime dependency on the CLI after generation — adapt it however you like."
          />
        </div>
      </div>
    </section>
  );
};
