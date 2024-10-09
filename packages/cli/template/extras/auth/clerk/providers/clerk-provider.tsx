// @ts-nocheck

import { ClerkProvider as Clerk } from "@clerk/nextjs"
import { FC, ReactNode } from "react"

type Props = {
  children?: ReactNode
}

export const ClerkProvider: FC<Props> = ({ children }) => {
  return (
    <Clerk>
      {children}
    </Clerk>
  )
}