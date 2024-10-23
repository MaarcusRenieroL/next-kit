import { InfiniteMovingCards } from "@repo/ui/components/ui/infinite-scrolling-cards";
import { FC } from "react";

type Props = {
  service: {
    title: string;
    description: string;
    packages: {
      title: string;
      description: string;
    }[];
  };
  direction: "left" | "right";
};

export const PackageCard: FC<Props> = ({ service, direction }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5 h-fit">
      <h1 className="text-2xl font-bold">{service.title}</h1>
      <p className="text-sm">{service.description}</p>
      <InfiniteMovingCards
        items={service.packages}
        direction={direction}
        speed="slow"
      />
      <div></div>
    </div>
  );
};
