"use client";

import { FC } from "react";
import { CommunityCard } from "../community-card";
import { DiscordLogo, GithubLogo, XLogo } from "@phosphor-icons/react";

export const CommunitySection: FC = () => {
  return (
    <div className="lg:p-10 overflow-hidden h-full w-full flex flex-col items-center justify-center md:px-4 lg:px-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 relative text-left dark:text-zinc-100 text-zinc-700 max-w-4xl mt-5">
        Community
      </h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <CommunityCard
          Logo={DiscordLogo}
          title="Discord"
          description="Join our Discord server to chat with other developers and get help with your projects."
          href=""
        />
        <CommunityCard
          Logo={GithubLogo}
          title="Github"
          description="Contribute to the project by submitting issues and pull requests on our GitHub repository."
          href="https://github.com/MaarcusRenieroL/next-cli"
        />
        <CommunityCard
          Logo={XLogo}
          title="X"
          description="Follow us on X for project updates and behind-the-scenes looks at what we're building next."
          href=""
        />
      </div>
    </div>
  );
};
