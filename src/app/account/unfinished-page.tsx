import Layout from '@/components/Layout'
import BackButton from '@/components/Mobile/BackButton'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { FC } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Avatar from '@/ui/Avatar'
import Settings from './Settings'

const Account: FC = async () => {
  const session = await getServerSession(authOptions)

  return (
    <Layout>
      <main className="md:pt-header h-screen">
        <div className="container flex gap-8 py-4 px-6 md:py-0 md:!mb-8 items-center justify-between md:justify-start relative">
          <Link
            href="/"
            className="text-neutral-400 flex items-center gap-3 hover:text-neutral-100 transition-colors rounded-full hidden md:flex pl-3 h-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="text-xs hidden md:block">Back</span>
          </Link>
          <BackButton className="md:hidden" />
          <h1 className="text-lg md:text-xl font-bold text-white pr-3 md:pr-0 tracking-wide absolute md:static top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] md:translate-x-0 md:translate-y-0">
            Account
          </h1>
        </div>
        <div className="container py-8">
          <div className="flex justify-center mb-10">
            <Avatar src={session?.user.avatar} className="h-40 w-40 md:h-48 md:w-48 rounded-full" />
          </div>
          <div className="flex gap-5 items-center justify-center">
            <h1 className="text-center text-white text-3xl font-semibold">{session?.user.name}</h1>
            <Settings />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Account
