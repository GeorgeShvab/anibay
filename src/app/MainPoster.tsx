'use client'

import { Anime } from '@/types'
import Link from 'next/link'
import { FC } from 'react'

const MainPoster: FC<Anime> = (anime) => {
  let description = anime.description

  if (description.split(' ').length > 40) {
    description = description.split(' ').slice(0, 40).join(' ') + '...'
  }

  return (
    <div
      className="md:hidden main-poster h-[420px] md:h-[600px] flex flex-col md:items-center md:flex-row md:justify-between justify-end p-4 md:px-8 lg:py-10 z-0 lg:px-20 lg:pr-48 mb-6 lg:mb-0 relative md:justify-start"
      style={{
        '--main-poster-image': `url(${anime.image})`,
        '--main-poster-cover': `url(${anime.cover})`,
      }}
    >
      <div>
        <h2
          className={`text-white font-bold mb-3 md:pr-20 ${
            anime.title.length > 40 && anime.title.length < 60
              ? 'text-xl md:text-2xl lg:text-3xl md:text-3xl md:text-5xl lg:text-6xl'
              : anime.title.length > 60
              ? 'text-2xl md:text-4xl lg:text-5xl'
              : 'text-3xl md:text-5xl lg:text-6xl'
          }`}
        >
          {anime.title}
        </h2>
        <div className="flex gap-2.5 md:gap-3 md:gap-4 items-center md:mb-8">
          <div className="flex gap-3 items-center">
            <span className="text-red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 md:w-6 h-5 md:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </span>
            <span className="text-sm md:text-base text-gray-400 md:text-gray-300">{anime.rating / 10}/10</span>
          </div>
          <p className="text-sm md:text-base text-gray-400 md:text-gray-300 ml-4">{anime.releaseDate} year</p>
          {anime.totalEpisodes !== 1 && anime.totalEpisodes ? (
            <p className="text-sm md:text-base text-gray-400 md:text-gray-300">{anime.totalEpisodes} episodes</p>
          ) : null}
          {anime.status === 'Ongoing' ? <p className="text-red text-sm">Ongoing</p> : null}
        </div>
        <p className="text-gray-300 hidden md:block w-[75%]" dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      <Link
        className="h-16 w-16 md:h-[80px] md:w-[80px] block flex-shrink-0 rounded-full flex items-center justify-center absolute md:static bg-red opacity-90 top-40 md:top-1/2 md:translate-y-[0] left-1/2 translate-x-[-50%] md:translate-x-0 md:left-[unset] md:right-48 text-white block hover:bg-red-dark hover:scale-105 transition-all"
        href={`/watch/${anime.id}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      </Link>
    </div>
  )
}

export default MainPoster
