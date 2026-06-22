import { FC } from "react";

const steps: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Run one command",
    body: "Kick it off with npx next-cli@latest — no global install, no setup.",
  },
  {
    n: "02",
    title: "Pick your stack",
    body: "Answer a few prompts: auth, database, ORM, API layer, payments, email, and analytics.",
  },
  {
    n: "03",
    title: "Start building",
    body: "Get a typed, configured project with every choice wired together and ready to run.",
  },
];

export const HowItWorksSection: FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden md:px-4 lg:p-10 lg:px-8">
      <h2 className="mb-6 mt-5 max-w-4xl text-3xl font-bold text-zinc-700 dark:text-zinc-100 md:text-5xl">
        How it works
      </h2>
      <p className="mb-10 max-w-2xl text-center text-zinc-500 dark:text-zinc-300">
        From zero to a running full-stack app in three steps.
      </p>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {steps.map(step => (
          <div
            key={step.n}
            className="relative overflow-hidden rounded-xl border bg-card p-6"
          >
            <span className="text-4xl font-bold text-primary/30">{step.n}</span>
            <h3 className="mt-3 text-xl font-semibold text-zinc-700 dark:text-zinc-100">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
