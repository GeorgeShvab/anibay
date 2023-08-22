import Link from 'next/link'
import { FC, ReactElement } from 'react'

const Genre: FC<{ children: string; className?: string; link?: boolean }> = ({
  children,
  link = true,
  className = '',
}) => {
  if (link) {
    return (
      <Link href={/*`/genre/${children.toLowerCase()}`*/ '/'}>
        <div
          className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-red hover:bg-red-dark transition-colors text-white text-2xs md:text-xs ${className}`}
        >
          {children}
        </div>
      </Link>
    )
  }

  return (
    <div
      className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-red hover:bg-red-dark transition-colors text-white text-2xs md:text-xs ${className}`}
    >
      {children}
    </div>
  )
}

export default Genre
