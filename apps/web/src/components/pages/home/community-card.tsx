"use client";

import { Icon } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import Link from "next/link";
import { FC } from "react";

type Props = {
  title: string;
  description: string;
  Logo: Icon;
  href: string;
};

export const CommunityCard: FC<Props> = ({
  title,
  href,
  Logo,
  description,
}) => {
  return (
    <Link href={href} className="w-full h-full text-center">
      <Card className="w-full h-full flex flex-col items-center justify-between hover:bg-secondary duration-300 transition-all">
        <CardHeader className="flex flex-col items-center justify-center gap-5">
          <div className="bg-primary rounded-full p-2">
            <Logo className="h-8 w-8" weight="fill" />
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{description}</CardContent>
      </Card>
    </Link>
  );
};
