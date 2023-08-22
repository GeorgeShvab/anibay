import Genre from '@/components/Genre'
import * as types from '@/types'
import { FC } from 'react'

interface PropsType {
  genres: types.Genre[]
}

const Genres: FC<PropsType> = ({ genres }) => {
  return (
    <div className="flex overflow-x-auto w-full gap-2 no-scrollbar">
      {genres.map((item) => (
        <Genre className="text-sm px-2.5 py-1.5 md:text-[16px] md:px-3 md:py-2 whitespace-nowrap" key={item.id}>
          {item.title}
        </Genre>
      ))}
    </div>
  )
}

export default Genres
