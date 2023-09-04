'use client'

import { Anime } from '@/types'
import Link from 'next/link'
import { FC } from 'react'
import Image from 'next/image'
import Bookmark from '@/components/Bookmark'
import IconButton from '@/ui/IconButton'

const HorizontalCard: FC<Anime<{ isBookmarked: boolean }>> = ({
  id,
  title,
  releaseDate,
  totalEpisodes,
  image,
  status,
  rating,
  isBookmarked,
}) => {
  return (
    <div
      className={`rounded p-2 group hover:scale-[1.025] transition-all shadow-xl bg-dark hover:bg-dark-light transition-all cursor-pointer `}
    >
      <Link href={`/watch/${id}`} className="h-full block">
        <div className="flex gap-5">
          <div className="relative min-h-full w-24 rounded overflow-hidden shadow-2xl">
            <Image src={image} alt={title} style={{ objectFit: 'cover' }} fill />
          </div>
          <div className={`flex-1 py-1 pr-2 flex flex-col justify-between`}>
            <div className="mb-6">
              <h3 className="text-neutral-100 font-medium text-xs md:text-sm mb-1 md:mb-2">{title}</h3>
              <div className="flex gap-3 mb-1 items-center">
                <div className="flex gap-1.5 items-center">
                  <span className="text-red">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </span>
                  <span className="text-xs text-gray-500">{(rating / 10).toFixed(1)}</span>
                </div>
                <p className="text-xs text-gray-500">{releaseDate} year</p>
                {totalEpisodes !== 1 && totalEpisodes ? (
                  <p className="text-xs text-gray-500">{totalEpisodes} episodes</p>
                ) : null}
              </div>
              {status === 'Ongoing' ? <p className="text-red text-xs md:text-sm">Ongoing</p> : null}
            </div>
            <div className="flex gap-3 w-full">
              <IconButton color="black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </IconButton>
              <div onClick={(e) => e.preventDefault()} className="flex-1">
                <Bookmark isBookmarked={isBookmarked} id={id} className="text-xs !gap-2 whitespace-nowrap" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HorizontalCard
