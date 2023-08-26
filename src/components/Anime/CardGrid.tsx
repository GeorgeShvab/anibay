import { FC } from 'react'
import Card from './PosterCard'
import { Anime } from '@/types'

interface Props {
  className?: string
  data: Anime[]
  mobileSlider?: boolean
}

const CardGrid: FC<Props> = ({ data, mobileSlider = false, className = '' }) => {
  return (
    <div
      className={`grid ${
        mobileSlider ? 'grid-flow-col auto-cols-[220px]' : 'grid-cols-2 grid-flow-row'
      } md:grid-flow-row auto-cols-[220px] md:auto-cols-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 overflow-auto md:overflow-visible no-scrollbar ${className}`}
    >
      {data.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  )
}

export default CardGrid
