import { FC } from 'react'
import Rating from './Rating'
import Stars from '@/components/Stars'

interface PropsType {
  releaseDate: number
  totalEpisodes: number
  status: string
  rating: number
}

const SubTitleText: FC<PropsType> = ({ releaseDate, totalEpisodes, status, rating }) => {
  return (
    <div className="flex gap-3 md:gap-4 mb-5 items-center">
      <Stars rating={rating} />
      <p className="text-sm text-gray-500 md:text-neutral-400 md:text-lg ml-4 md:ml-8">{releaseDate} year</p>
      {totalEpisodes !== 1 && totalEpisodes ? (
        <p className="text-sm text-gray-500 md:text-neutral-400 md:text-lg">{totalEpisodes} episodes</p>
      ) : null}
      {status === 'Ongoing' ? <p className="text-red text-sm md:text-lg">Ongoing</p> : null}
    </div>
  )
}

export default SubTitleText
