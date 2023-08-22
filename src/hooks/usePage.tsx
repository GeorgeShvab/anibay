'use client'

import { Page } from '@/types'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PageState {
  page: Page | undefined
  id: string | undefined
  episode: string | undefined
}

const usePage = (): PageState => {
  const router = useRouter()

  const pathname = usePathname()

  const [page, setPage] = useState<PageState>({
    page: undefined,
    id: undefined,
    episode: undefined,
  })

  useEffect(() => {
    if (!pathname) return

    const splitedPathname = pathname.split('/')

    let page = undefined
    let id = undefined
    let episode = undefined

    page = (splitedPathname[1] || 'home') as Page

    if (splitedPathname[1] === 'watch') {
      id = splitedPathname[2]
      episode = splitedPathname[3]
    }

    setPage({ page, id, episode })
  }, [pathname])

  return page
}

export default usePage
