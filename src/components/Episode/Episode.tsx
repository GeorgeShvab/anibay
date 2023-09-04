import { Episode as EpisodeType, Anime } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props extends EpisodeType {
  anime: Anime
}

const Episode: FC<Props> = ({ number, anime }) => {
  return (
    <Link
      href={`/watch/${anime.id}`}
      className="group block rounded-lg group min-w-[240px] md:min-w-[auto] md:w-full h-40 md:h-[160px] rounded-lg shadow-2xl md:hover:scale-[1.025] transition-all shadow-xl bg-dark md:hover:bg-dark-light transition-all cursor-pointer relative overflow-hidden"
    >
      <Image
        src={anime.image}
        alt={anime.title}
        className={`w-full h-full`}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        fill
      />
      <div className="absolute left-1/2 top-1/2 text-white translate-x-[-50%] translate-y-[-50%] h-10 w-10 bg-red/75 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-end px-2.5 py-2 md:py-3 md:px-3 card-image left-0 top-0 right-0 bottom-0 absolute">
        <div className="flex gap-3 mb-1 items-center">
          <p className="text-sm md:text-xs text-gray-200 whitespace-nowrap">Episode {number}</p>
        </div>
        <h4 className="text-white font-bold">{anime.title}</h4>
      </div>
    </Link>
  )
}

export default Episode
