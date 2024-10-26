"use client";

import type { FC } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@repo/ui/components/ui/card";
import { Icon } from "@phosphor-icons/react";
import { Badge } from "@repo/ui/components/ui/badge";

type Props = {
  title: string;
  description: string;
  highlight: string;
  CardIcon: Icon;
};

export const FeatureCard: FC<Props> = ({
  title,
  description,
  highlight,
  CardIcon,
}) => {
  return (
    <Card className="w-full h-full flex items-start justify-between flex-col">
      <CardHeader>
        <div className="flex items-center gap-5">
          <CardIcon className="h-8 w-8" />
          <CardTitle className="text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="w-full flex items-center justify-center text-center">
        <Badge>{highlight}</Badge>
      </CardFooter>
    </Card>
  );
};
