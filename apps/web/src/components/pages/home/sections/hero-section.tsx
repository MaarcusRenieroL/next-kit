import { FC } from "react";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "../../../../../public/assets/placeholder.svg";

export const HeroSection: FC = () => {
  return (
    <div className="relative pt-10 lg:p-10 overflow-hidden text-center">
      <div className="absolute inset-0 dark:bg-grid-white/[0.06] bg-grid-black/[0.04] [mask-image:linear-gradient(to_bottom,white_5%,transparent_20%)] pointer-events-none select-none"></div>
      <svg
        className="animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 -top-[40rem] left-0 md:left-60 md:-top-[30rem]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3787 2842"
        fill="none"
      >
        <g filter="url(#filter)">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
            className="dark:fill-white/[0.4] fill-transparent"
            fill-opacity="0.21"
          ></ellipse>
        </g>
        <defs>
          <filter
            id="filter"
            x="0.860352"
            y="0.838989"
            width="3785.16"
            height="2840.26"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="151"
              result="effect1_foregroundBlur_1065_8"
            ></feGaussianBlur>
          </filter>
        </defs>
      </svg>
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
          <div className="h-full w-full">
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
