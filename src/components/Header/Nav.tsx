'use client'

import Link from 'next/link'
import { FC } from 'react'
import Button from '@/ui/Button'
import SearchBar from './SearchBar'
import usePage from '@/hooks/usePage'
import AuthClickProtection from '../AuthClickProtection'
import { useSession } from 'next-auth/react'
import Avatar from '@/ui/Avatar'

const Nav: FC = () => {
  const session = useSession()

  const page = usePage()

  return (
    <nav className="flex w-full justify-between items-center gap-12 hidden md:flex h-10">
      <ul className="flex gap-10 flex-1">
        <li className="text-neutral-100 font-normal hover:text-gray-200 transition-colors whitespace-nowrap">
          <Link href="/">Home</Link>
        </li>
        <li className="text-neutral-100 font-normal hover:text-gray-200 transition-colors whitespace-nowrap">
          <Link href="/genre">Genres</Link>
        </li>
        <li className="text-neutral-100 font-normal hover:text-gray-200 transition-colors whitespace-nowrap">
          <Link href="/saved">Saved</Link>
        </li>
      </ul>
      <div className="flex-auto max-w-md hidden lg:block">
        <SearchBar />
      </div>
      <ul className="flex gap-10 items-center flex-initial hidden sm:flex">
        <li className="text-neutral-100 font-normal hover:text-gray-200 transition-colors whitespace-nowrap">
          <Link href="/help">Help</Link>
        </li>
        {session.status === 'authenticated' ? (
          <li
            className={`${
              page.page === 'account' ? `text-red hover:text-red-dark` : 'text-neutral-100 hover:text-gray-200'
            } font-normal transition-colors`}
          >
            <Link href="/account">
              <div className="flex gap-8 items-center">
                <h4>{session.data?.user?.name}</h4>
                <Avatar src={session?.data?.user.avatar} alt={session.data.user.name || 'user'} className="h-8 w-8" />
              </div>
            </Link>
          </li>
        ) : (
          <li className="font-normal hover:text-gray-200 transition-colors whitespace-nowrap">
            <AuthClickProtection>
              <Button>Sign In</Button>
            </AuthClickProtection>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Nav
