import { Genre } from '@/types'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  data: Genre[]
}

const Genres: FC<Props> = ({ data, className = '' }) => {
  return (
    <div className={`flex md:flex-wrap gap-2 w-full overflow-auto no-scrollbar ${className}`}>
      {data.map((item, index) => (
        <Link
          className={`px-4 py-1.5 rounded text-white h-fit whitespace-nowrap hover:bg-red-dark transition-colors ${
            !index ? 'bg-dark' : 'bg-dark'
          }`}
          key={item.id}
          href={`/genres/${item.id}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default Genres
