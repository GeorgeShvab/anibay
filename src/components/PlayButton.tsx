import Link from 'next/link'
import { FC } from 'react'

interface Props {
  href?: string
  className?: string
  iconClassName?: string
}

const PlayButton: FC<Props> = ({ href, className, iconClassName }) => {
  if (href) {
    return (
      <Link
        className={`h-10 w-10 rounded-full opacity-80 md:opacity-90 bg-red block flex justify-center items-center text-white ${className}`}
        href={href}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${iconClassName}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      </Link>
    )
  } else {
    return (
      <span
        className={`h-10 w-10 rounded-full opacity-80 md:opacity-90 bg-red block flex justify-center items-center text-white ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${iconClassName}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      </span>
    )
  }
}

export default PlayButton
