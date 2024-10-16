import { FC, ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

type Props = {
  children?: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
