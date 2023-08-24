'use client'

import usePage from '@/hooks/usePage'
import Link from 'next/link'

const Nav = () => {
  const page = usePage()

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
            href="/"
            className={
              page === 'movies' ? 'text-white scale-105' : 'text-gray-400 hover:text-gray-200 transition-colors'
            }
          >
            <span>Movies</span>
          </Link>
          <span
            className={`absolute bg-red rounded-full h-[4px] w-[24px] top-[120%] left-1/2 translate-x-[-50%] ${
              page === 'movies' ? 'block' : 'hidden'
            }`}
          ></span>
        </li>
        <li className="relative">
          <Link
            href="/"
            className={
              page === 'series' ? 'text-white scale-105' : 'text-gray-400 hover:text-gray-200 transition-colors'
            }
          >
            <span>Series</span>
          </Link>
          <span
            className={`absolute bg-red rounded-full h-[4px] w-[24px] top-[120%] left-1/2 translate-x-[-50%] ${
              page === 'series' ? 'block' : 'hidden'
            }`}
          ></span>
        </li>
        <li className="relative">
          <Link
            href="/"
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
