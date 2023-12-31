import { FC } from 'react'
import HorizontalPoster from './HorizontalPoster'
import { Anime } from '@/types'

interface Props {
  className?: string
  data: Anime[]
}

const PosterGrid: FC<Props> = ({ data, className = '' }) => {
  return (
    <div className={`grid gap-3 grid-cols-1 lg:grid-cols-2 ${className}`}>
      {data.map((item) => (
        <HorizontalPoster key={item.id} {...item} />
      ))}
    </div>
  )
}

export default PosterGrid
