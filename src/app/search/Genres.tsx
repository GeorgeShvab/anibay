import Genre from '@/components/Genre'
import * as types from '@/types'
import { headers } from 'next/headers'
import Link from 'next/link'
import { FC } from 'react'

interface PropsType {
  data: types.Genre[]
  className?: string
  genre?: string
  query?: string
  page: number
}

const Genres: FC<PropsType> = ({ data, query, page, genre = 'all', className = '' }) => {
  return (
    <div className={`flex md:flex-wrap gap-2 w-full overflow-auto no-scrollbar ${className}`}>
      <Link
        className={`px-4 py-1.5 rounded text-white h-fit whitespace-nowrap hover:bg-red-dark transition-colors ${
          genre === 'all' ? 'bg-red' : 'bg-dark'
        }`}
        href={`/search?${query ? 'query=' + query + '&' : ''}${page ? 'page=' + page + '&' : ''}${
          genre ? 'genre=' + genre : ''
        }`}
      >
        All
      </Link>
      {data.map((item, index) => (
        <Link
          className={`px-4 py-1.5 rounded text-white h-fit whitespace-nowrap hover:bg-red-dark transition-colors ${
            item.id === genre ? 'bg-red' : 'bg-dark'
          }`}
          href={`/search?${query ? 'query=' + query + '&' : ''}${page ? 'page=' + page + '&' : ''}genre=${item.id}`}
          key={item.id}
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default Genres
