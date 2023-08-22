'use client'

import usePage from '@/hooks/usePage'
import throttle from '@/utils/throttle'
import Link from 'next/link'
import { FC, memo, useEffect, useState } from 'react'
import Logo from '../Logo'
import AuthClickProtection from '../AuthClickProtection'

const Navigation: FC = () => {
  const [show, setShow] = useState<boolean>(true)

  const page = usePage()

  const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  let scrollPosition = 0

  const handleScroll = throttle((e: Event) => {
    const offset = window.scrollY

    if (offset > scrollPosition) {
      setShow(false)
    } else {
      setShow(true)
    }

    scrollPosition = offset
  }, 25)

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-0 z-30 left-0 w-full flex transition-all justify-between p-2 px-4 bg-dark md:hidden z-30 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        boxShadow: page.page === 'home' ? 'none' : '0 0 5px 0 rgba(0,0,0,1)',
      }}
    >
      <Link href="/top" className={`flex-initial px-2 p-1.5 ${page.page === 'top' ? 'text-red' : 'text-white'}`}>
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
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </Link>
      <Link href="/" className={`flex-initial px-2 p-1.5 ${page.page === 'search' ? 'text-red' : 'text-white'}`}>
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </Link>
      <Link href="/">
        <Logo className={page.page === 'watch' || page.page === 'home' ? 'text-red' : 'text-white'} />
      </Link>
      <Link href="/saved" className={`flex-initial px-2 p-1.5 ${page.page === 'saved' ? 'text-red' : 'text-white'}`}>
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
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </Link>

      <AuthClickProtection
        className={`flex-initial ${page.page === 'saved' ? 'text-red' : 'text-white'}`}
        element="div"
        fallback={
          <button className="px-2 p-1.5 text-white">
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
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        }
      >
        <Link href="/account" className={`px-2 p-1.5 ${page.page === 'saved' ? 'text-red' : 'text-white'}`}>
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
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
      </AuthClickProtection>
    </div>
  )
}

export default memo(Navigation)
