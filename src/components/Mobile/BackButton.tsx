'use client'

import IconButton from '@/ui/IconButton'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface Props {
  className?: string
}

const BackButton: FC<Props> = ({ className }) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <IconButton className={className} color="dark" onClick={handleBack} aria-label="Back">
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
  )
}

export default BackButton
