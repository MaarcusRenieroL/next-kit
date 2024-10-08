import { FC, ReactNode } from "react"

type Props = {
  children?: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
}