'use client'

import { FC, ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

interface Props {
  children: ReactElement
}

const ReactQueryContext: FC<Props> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryContext
