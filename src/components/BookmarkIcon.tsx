'use client'

import axios from '@/axios'
import AuthClickProtection from '@/components/AuthClickProtection'
import IconButton from '@/ui/IconButton'
import { FC, useState } from 'react'

interface Props {
  id: string
  isBookmarked: boolean
}

const BookmarkIcon: FC<Props> = (props) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(props.isBookmarked)

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked)

    await axios.post(`/api/anime/${props.id}/bookmark`)
  }

  return (
    <AuthClickProtection
      fallback={
        <IconButton color="dark" title="Add to List">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 transition-all"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </IconButton>
      }
    >
      <IconButton className={isBookmarked ? '!text-red' : ''} color="dark" onClick={handleBookmark} title="Add to List">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isBookmarked ? 'currentColor' : 'none'}
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
      </IconButton>
    </AuthClickProtection>
  )
}

export default BookmarkIcon
