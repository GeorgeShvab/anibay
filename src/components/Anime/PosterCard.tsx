'use client'

import { Anime } from '@/types'
import Link from 'next/link'
import { FC } from 'react'
import Image from 'next/image'
import Stars from '../Stars/Stars'

const Card: FC<Anime> = ({ title, id, image, totalEpisodes, releaseDate, rating }) => {
  return (
    <Link
      href={`/watch/${id}`}
      className="group relative w-full h-72 md:h-80 lg:h-[360px] block rounded-lg overflow-hidden group md:hover:scale-[1.025] transition-all shadow-xl bg-dark md:hover:bg-dark-light transition-all cursor-pointer"
    >
      <Image
        src={image}
        alt={title}
        className={`w-full h-full`}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        sizes=""
        fill
      />
      <div className="card-image absolute left-0 top-0 right-0 bottom-0 rounded-lg overflow-hidden shadow-2xl flex flex-col justify-end px-2.5 py-2 md:py-3 md:px-3.5">
        <h4 className="text-white font-bold mb-1 leading-5">{title}</h4>
        <div className="flex gap-3 mb-2 items-center">
          <p className="text-[10px] md:text-xs text-neutral-300 whitespace-nowrap">{releaseDate} year</p>
          {totalEpisodes !== 1 && totalEpisodes ? (
            <p className="text-[10px] md:text-xs text-neutral-300 whitespace-nowrap">{totalEpisodes} episodes</p>
          ) : null}
        </div>
        <Stars rating={rating} className="!gap-1" iconContainerClassName="[&>svg]:h-4 [&>svg]:w-4" />
      </div>
    </Link>
  )
}

export default Card
