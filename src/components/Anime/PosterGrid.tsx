import { FC } from 'react'
import HorizontalPoster from './HorizontalPoster'
import { Anime } from '@/types'

interface Props {
  className?: string
  data: Anime[]
}

const PosterGrid: FC<Props> = ({ data, className = '' }) => {
  return (
    <div className={`grid gap-4 grid-cols-1 md:grid-cols-2 ${className}`}>
      {data.map((item) => (
        <HorizontalPoster key={item.id} {...item} />
      ))}
    </div>
  )
}

export default PosterGrid
