// @ts-nocheck
import type { FC } from "react";

type Props = {
  firstName: string;
};

export const EmailTemplate: FC<Props> = ({ firstName }) => {
  return (
    <div>
      <h1>Hello, {firstName}</h1>
    </div>
  );
};
