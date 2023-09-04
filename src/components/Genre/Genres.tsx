import Genre from '@/components/Genre'
import * as types from '@/types'
import { headers } from 'next/headers'
import Link from 'next/link'
import { FC } from 'react'

interface PropsType {
  data: types.Genre[]
  className?: string
}

const Genres: FC<PropsType> = ({ data, className = '' }) => {
  return (
    <div className={`flex md:flex-wrap gap-2 w-full overflow-auto no-scrollbar ${className}`}>
      {data.map((item, index) => (
        <Link
          className={`px-4 py-1.5 rounded-lg text-white h-fit whitespace-nowrap md:hover:bg-red-dark transition-colors bg-red`}
          href={`/search?genre=${item.id}`}
          key={item.id}
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default Genres
