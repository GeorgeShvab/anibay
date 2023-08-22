import Genre from '@/components/Genre'
import { FC } from 'react'
import * as types from '@/types'

interface Props {
  genres: types.Genre[]
}

const Genres: FC<Props> = ({ genres }) => {
  return (
    <div className="text-gray-400 gap-2 md:gap-3 flex flex-wrap mb-4 md:mb-8">
      {genres.map((item) => (
        <Genre key={item.id} className="text-sm py-1 px-2 lg:text-base md:py-1.5 md:px-3">
          {item.title}
        </Genre>
      ))}
    </div>
  )
}

export default Genres
