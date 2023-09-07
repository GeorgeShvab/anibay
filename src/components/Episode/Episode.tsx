import { Episode as EpisodeType, Anime } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import PlayButton from '../PlayButton'

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
      <div className="flex flex-col justify-end px-2.5 py-2 md:py-3 md:px-3 card-image left-0 top-0 right-0 bottom-0 absolute">
        <div className="flex gap-3 mb-1 items-center">
          <p className="text-sm md:text-xs text-gray-200 whitespace-nowrap">Episode {number}</p>
        </div>
        <h4 className="text-white font-bold">{anime.title}</h4>
      </div>
      <PlayButton
        className="absolute z-20 left-1/2 top-1/2 text-white translate-x-[-50%] translate-y-[-50%]"
        iconClassName="!h-5 !w-5 translate-x-[2px]"
      />
    </Link>
  )
}

export default Episode
