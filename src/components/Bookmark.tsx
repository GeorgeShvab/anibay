'use client'

import { FC, useState } from 'react'
import IconButton from '@/ui/IconButton'
import axios from '@/axios'
import Button from '@/ui/Button'
import AuthClickProtection from '@/components/AuthClickProtection'

interface Props {
  isBookmarked: boolean
  id: string
  className?: string
}

const Bookmark: FC<Props> = ({ id, isBookmarked, className }) => {
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked)

  const handleBookmark = async () => {
    setBookmarked(!bookmarked)

    await axios.post(`/api/anime/${id}/bookmark`).catch((e: any) => {})
  }

  return (
    <AuthClickProtection
      fallback={
        <Button className={`gap-4 md:gap-3 ${className}`}>
          <>
            <span className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
            <span className="text-sm">Add to list</span>
          </>
        </Button>
      }
    >
      <Button onClick={handleBookmark} className={`gap-4 md:gap-3 ${className}`}>
        {bookmarked ? (
          <>
            <span className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
              </svg>
            </span>
            <span className="text-sm">Remove from list</span>
          </>
        ) : (
          <>
            <span className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
            <span className="text-sm">Add to list</span>
          </>
        )}
      </Button>
    </AuthClickProtection>
  )
}

export default Bookmark
