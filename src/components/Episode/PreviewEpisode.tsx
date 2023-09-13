'use client'

import { Episode as EpisodeType, Anime } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import PlayButton from '../PlayButton'
import axios from 'axios'
import Preview from '../Preview'

interface Props extends EpisodeType {
  anime: Anime
  className?: string
}

const Episode: FC<Props> = ({ number, anime, sources, className }) => {
  return (
    <Link
      href={`/watch/${anime.id}`}
      className={`group block rounded-lg group w-full w-[400px] h-56 rounded-lg shadow-2xl md:hover:scale-[1.025] transition-all shadow-xl bg-dark md:hover:bg-dark-light transition-all cursor-pointer relative overflow-hidden ${className}`}
    >
      <Preview url={sources.find((item) => item.quality === 'default')?.url || sources[0].url} />
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
