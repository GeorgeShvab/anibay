import { Anime } from '@/types'
import { FC, memo } from 'react'
import AnimeCard from './AnimeCard'

interface PropsType {
  data: Anime[]
}

const AnimeCards: FC<PropsType> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
      {data.map((item) => (
        <AnimeCard key={item.id} {...item} />
      ))}
    </div>
  )
}

export default memo(AnimeCards)
