'use client'

import Link from 'next/link'
import { FC } from 'react'
import Button from '@/ui/Button'
import AuthClickProtection from '../AuthClickProtection'
import { useSession } from 'next-auth/react'
import Avatar from '@/ui/Avatar'
import Search from './Search'

const HeaderAccount: FC = () => {
  const session = useSession()

  return (
    <div className="flex justify-between items-center gap-12 hidden md:flex h-10">
      <ul className="flex gap-6 items-center hidden sm:flex">
        <li>
          <Search />
        </li>
        <li className="">
          <button className="h-10 w-10 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
        </li>
        {session.status === 'authenticated' ? (
          <li>
            <Link href="/account">
              <Avatar
                src={session?.data?.user.avatar}
                alt={session.data.user.name || 'user'}
                className="h-8 w-8 rounded-full"
              />
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
    </div>
  )
}

export default HeaderAccount
