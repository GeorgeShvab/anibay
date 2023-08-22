'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactElement } from 'react'

const Provider: FC<{ session: Session; children: ReactElement }> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Provider
