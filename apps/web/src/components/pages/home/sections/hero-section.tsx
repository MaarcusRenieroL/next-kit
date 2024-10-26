import { FC } from "react";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "../../../../../public/assets/placeholder.svg";

export const HeroSection: FC = () => {
  return (
    <div className="pt-10 lg:p-10 overflow-hidden text-center">
      <div className="max-w-[84rem] w-full mx-auto relative z-20">
        <div
          className="grid grid-cols-1 xl:grid-cols-2 gap-10"
          style={{
            opacity: 1,
            transform: "none",
          }}
        >
          <div className="flex flex-col items-center md:items-start justify-center md:text-left text-center">
            <Badge>npx next-cli</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 dark:text-zinc-100 text-zinc-700 max-w-4xl mt-5">
              Setup production grade full stack applications in seconds
            </h1>
            <h2 className="text-sm sm:text-lg text-zinc-500 dark:text-zinc-300 tracking-wide mb-8 max-w-2xl antialiased leading-loose">
              Copy paste the most trending components and use them in your
              websites without having to worry about styling and animations.
            </h2>
            <div className="flex md:flex-row flex-col space-y-5 justify-center md:space-y-0 md:space-x-4 sm:justify-start mb-4 w-full">
              <Link href="/packages">
                <Button variant="outline" size="lg" className="w-full md:w-fit">
                  Browse Packages
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" className="w-full md:w-fit">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <div className="h-full w-full relative">
            <div className="w-[500px] blur-[120px] rounded-full absolute bg-primary/30 -z-100 md:bottom-54 bottom-0 right-0 flex items-center justify-center h-3/4" />
            <Image
              src={PlaceholderImage}
              className="w-full h-full dark:invert filter invert-0"
              alt="background"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
