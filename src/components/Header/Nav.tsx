'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState, useEffect } from 'react'

interface Props {
  page: string
}

const Nav: FC<Props> = (props) => {
  const pathname = usePathname()

  const [page, setPage] = useState<string>(props.page)

  useEffect(() => {
    const newPage = pathname?.split('/')[1].trim()

    if (newPage) {
      setPage(newPage)
    }
  }, [pathname])

  console.log(page)

  return (
    <nav>
      <ul className="flex md:gap-8 lg:gap-16 items-center absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]">
        <li className="relative">
          <Link
            href="/"
            className={page === 'home' ? 'text-white scale-105' : 'text-gray-400 hover:text-gray-200 transition-colors'}
          >
            <span>Home</span>
          </Link>
          <span
            className={`absolute bg-red rounded-full h-[4px] w-[24px] top-[120%] left-1/2 translate-x-[-50%] ${
              page === 'home' ? 'block' : 'hidden'
            }`}
          ></span>
        </li>
        <li className="relative">
          <Link
            href="/search"
            className={
              page === 'search' ? 'text-white scale-105' : 'text-gray-400 hover:text-gray-200 transition-colors'
            }
          >
            <span>Search</span>
          </Link>
          <span
            className={`absolute bg-red rounded-full h-[4px] w-[24px] top-[120%] left-1/2 translate-x-[-50%] ${
              page === 'search' ? 'block' : 'hidden'
            }`}
          ></span>
        </li>
        <li className="relative">
          <Link
            href="/list"
            className={page === 'list' ? 'text-white scale-105' : 'text-gray-400 hover:text-gray-200 transition-colors'}
          >
            <span>My List</span>
          </Link>
          <span
            className={`absolute bg-red rounded-full h-[4px] w-[24px] top-[120%] left-1/2 translate-x-[-50%] ${
              page === 'list' ? 'block' : 'hidden'
            }`}
          ></span>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
