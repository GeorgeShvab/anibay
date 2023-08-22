'use client'

import { useRouter } from 'next/navigation'
import { FC, memo } from 'react'

const BackButton: FC = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <div className={`absolute top-0 left-0 p-2 sm:hidden z-50`}>
      <button onClick={handleClick} className={`flex-initial rounded-full bg-black p-2.5 shadow-2xl text-red`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
    </div>
  )
}

export default memo(BackButton)
