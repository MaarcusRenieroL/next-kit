"use client";

import { FC } from "react";
import { CommunityCard } from "../community-card";
import { Bug, ChatCircle, GithubLogo } from "@phosphor-icons/react";

const REPO = "https://github.com/MaarcusRenieroL/next-cli";

export const CommunitySection: FC = () => {
  return (
    <div className="lg:p-10 overflow-hidden h-full w-full flex flex-col items-center justify-center md:px-4 lg:px-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 relative text-left dark:text-zinc-100 text-zinc-700 max-w-4xl mt-5">
        Community
      </h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <CommunityCard
          Logo={GithubLogo}
          title="GitHub"
          description="Star the project, browse the source, and contribute pull requests on our GitHub repository."
          href={REPO}
        />
        <CommunityCard
          Logo={Bug}
          title="Issues"
          description="Hit a bug or have a feature request? Open an issue and we'll take a look."
          href={`${REPO}/issues`}
        />
        <CommunityCard
          Logo={ChatCircle}
          title="Discussions"
          description="Ask questions, share ideas, and talk with other developers using Next CLI."
          href={`${REPO}/discussions`}
        />
      </div>
    </div>
  );
};
