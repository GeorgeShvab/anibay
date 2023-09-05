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
