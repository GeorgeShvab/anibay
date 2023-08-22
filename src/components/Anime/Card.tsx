'use client'

import { Anime } from '@/types'
import Link from 'next/link'
import { FC } from 'react'
import Image from 'next/image'
import IconButton from '@/ui/IconButton'
import Bookmark from '../Bookmark'
import Button from '@/ui/Button'

const Card: FC<Anime> = ({ title, id, image, totalEpisodes, releaseDate, isBookmarked, rating, status }) => {
  return (
    <div
      className={`rounded group hover:scale-[1.025] transition-all shadow-xl bg-dark hover:bg-dark-light transition-all cursor-pointer `}
    >
      <Link href={`/watch/${id}`} className="h-full block">
        <div className="h-full flex flex-col">
          <div className="relative h-64 w-full rounded-t overflow-hidden shadow-2xl">
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20">
              <button className="bg-red rounded-full h-16 w-16 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 translate-x-[2px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </button>
            </div>
            <Image
              src={image}
              alt={title}
              style={{ objectFit: 'cover' }}
              className="group-hover:blur-sm transition-all"
              fill
            />
          </div>
          <div className="py-2.5 px-2.5 flex-1 flex flex-col justify-between">
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
            <div className="flex gap-2.5 w-full hidden">
              <Button className="gap-3 flex-1" color="black">
                <>
                  <span className="text-white">
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
                  </span>
                  <span className="text-sm">Watch now</span>
                </>
              </Button>
              <IconButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
