import { FC } from "react";

const steps: { n: string; title: string; body: string }[] = [
  {
    n: "1",
    title: "Run one command",
    body: "npx next-kit@latest — no global install, no setup.",
  },
  {
    n: "2",
    title: "Pick your stack",
    body: "Database, ORM, auth, API, payments, email, analytics.",
  },
  {
    n: "3",
    title: "Start building",
    body: "A typed, configured project, wired up and ready to run.",
  },
];

export const Steps: FC = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-indigo-400">
            How it works
          </span>
          <h2 className="nk-gradient-text mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            From zero to running in three steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent md:block" />
          {steps.map(s => (
            <div key={s.n} className="relative text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-indigo-500/30 bg-[#07070b] text-lg font-bold text-indigo-300">
                {s.n}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
