"use client";

import { FC } from "react";
import { FeatureCard } from "../feature-card";
import { CompassTool, Package, ProjectorScreen } from "@phosphor-icons/react";

export const FeatureSection: FC = () => {
  return (
    <div className="lg:p-10 overflow-hidden h-full w-full flex flex-col items-center justify-center md:px-4 lg:px-8">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 relative text-left dark:text-zinc-100 text-zinc-700 max-w-4xl mt-5">
        Features
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-5 w-full">
        <FeatureCard
          title="Quick Project Setup"
          description="Instantly set up projects with a single command. Save time by automating configuration and setup processes."
          highlight="No need for manual configuration."
          CardIcon={ProjectorScreen}
        />
        <FeatureCard
          title="Multiple Library and Framework Integration"
          description="Seamlessly integrate popular libraries and frameworks like React, Vue, Angular, Tailwind, and more during project setup."
          highlight="Flexibility to choose the right tools for your project."
          CardIcon={Package}
        />
        <FeatureCard
          title="Efficient Workflow"
          description="Automatically configure dependencies, build scripts, and folder structure optimized for development and deployment."
          highlight="Standardized environments and smooth workflows."
          CardIcon={CompassTool}
        />
      </div>
    </div>
  );
};
