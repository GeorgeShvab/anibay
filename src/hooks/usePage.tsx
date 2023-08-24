'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const usePage = () => {
  const pathname = usePathname()

  let initial

  if (typeof window === 'undefined') {
    initial = 'home'
  } else {
    window.location.href.split('/')[1]
  }

  const [page, setPage] = useState<string>(initial as string)

  useEffect(() => {
    if (!pathname) return

    const splitedPathname = pathname.split('/')

    let page = undefined

    page = (splitedPathname[1] || 'home') as string

    setPage(page)
  }, [pathname])

  return page
}

export default usePage
