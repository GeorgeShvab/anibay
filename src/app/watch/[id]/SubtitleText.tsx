import { FC } from 'react'
import Rating from './Rating'

interface PropsType {
  releaseDate: number
  totalEpisodes: number
  status: string
  rating: number
}

const SubTitleText: FC<PropsType> = ({ releaseDate, totalEpisodes, status, rating }) => {
  return (
    <div className="flex gap-3 md:gap-4 mb-5 items-center">
      <div className="flex gap-3 items-center">
        <span className="text-red">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </span>
        <span className="text-sm text-gray-500 md:text-neutral-400 md:text-lg">{rating / 10}</span>
      </div>
      <p className="text-sm text-gray-500 md:text-neutral-400 md:text-lg ml-4 md:ml-8">{releaseDate} year</p>
      {totalEpisodes !== 1 && totalEpisodes ? (
        <p className="text-sm text-gray-500 md:text-neutral-400 md:text-lg">{totalEpisodes} episodes</p>
      ) : null}
      {status === 'Ongoing' ? <p className="text-red text-sm md:text-lg">Ongoing</p> : null}
    </div>
  )
}

export default SubTitleText
