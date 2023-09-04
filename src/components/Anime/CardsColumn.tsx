import HorizontalCard from '@/components/Anime/HorizontalCard'
import { Anime } from '@/types'
import { FC } from 'react'

interface Props {
  data: Anime<{ isBookmarked: boolean }>[]
  title: string
  className?: string
}

const CardsColumn: FC<Props> = ({ data, title, className }) => {
  return (
    <div className={className}>
      <h2 className="mb-2 lg:mb-6 text-lg font-semibold md:text-2xl px-2 text-white">{title}</h2>
      <div className="flex flex-col gap-2 md:gap-3">
        {data.map((item) => (
          <HorizontalCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default CardsColumn
