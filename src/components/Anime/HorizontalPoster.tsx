import { Anime } from '@/types'
import Link from 'next/link'
import { FC } from 'react'
import Stars from '../Stars/Stars'
import Image from 'next/image'

const HorizontalPoster: FC<Anime> = ({ rating, title, image, id, totalEpisodes, cover, releaseDate }) => {
  return (
    <Link
      href={`/watch/${id}`}
      className="w-full md:hover:scale-[1.015] relative transition-all h-40 md:h-64 rounded-lg overflow-hidden"
    >
      <img src={cover || image} alt={title} className="w-full h-full object-cover w-full h-full" />
      <div className="card-image absolute left-0 right-0 top-0 bottom-0 px-4 py-3 pr-20 lg:px-6 lg:py-6 lg:pr-40 rounded-lg flex flex-col justify-end">
        <h2 className="text-white text-base md:text-xl lg:text-3xl font-bold mb-2 md:mb-3">{title}</h2>
        <div className="flex gap-2.5 md:gap-3 md:gap-4 items-center">
          <Stars rating={rating} className="!gap-2" iconContainerClassName="[&>svg]:h-5 [&>svg]:w-5" />
          <p className="text-xs md:text-sm text-gray-200 ml-4 whitespace-nowrap">{releaseDate} year</p>
          {totalEpisodes !== 1 && totalEpisodes ? (
            <p className="text-xs md:text-sm text-gray-200 whitespace-nowrap">{totalEpisodes} episodes</p>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default HorizontalPoster
