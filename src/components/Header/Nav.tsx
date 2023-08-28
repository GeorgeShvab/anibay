import usePage from '@/hooks/usePage'
import { headers } from 'next/headers'
import Link from 'next/link'

const Nav = () => {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') || ''

  const page = pathname.split('/')[1] || 'home'

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
              page === 'series' ? 'block' : 'hidden'
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
