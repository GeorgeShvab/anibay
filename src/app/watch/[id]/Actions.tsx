'use client'

import axios from '@/axios'
import AuthClickProtection from '@/components/AuthClickProtection'
import BookmarkIcon from '@/components/BookmarkIcon'
import IconButton from '@/ui/IconButton'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

interface Props {
  id: string
  isBookmarked: boolean
}

const Actions: FC<Props> = (props) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="absolute p-3 top-0 left-0 w-full flex justify-between md:hidden">
      <IconButton className="" color="dark" onClick={handleBack}>
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
      </IconButton>
      <BookmarkIcon {...props} />
    </div>
  )
}

export default Actions
