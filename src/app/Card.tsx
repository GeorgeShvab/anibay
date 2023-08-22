'use client'

import { Anime } from '@/types'
import Link from 'next/link'
import { FC } from 'react'
import Image from 'next/image'
import IconButton from '@/ui/IconButton'
import Button from '@/ui/Button'

const Card: FC<Anime> = ({ title, id, image, totalEpisodes, releaseDate, isBookmarked, rating, status }) => {
  return (
    <div
      className={`rounded group hover:scale-[1.025] transition-all shadow-xl bg-dark hover:bg-dark-light transition-all cursor-pointer `}
    >
      <Link href={`/watch/${id}`} className="block">
        <div className="flex flex-col">
          <div
            className="relative w-60 md:w-full  h-80 rounded overflow-hidden shadow-2xl flex flex-col justify-end p-2.5"
            style={{
              backgroundImage: `linear-gradient(
                  #06060600 50%,
                  #060606cc 100%
                ),
                url(${image})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <h4 className="text-white font-bold mb-2">{title}</h4>
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
                <span className="text-xs text-neutral-300">{(rating / 10).toFixed(1)}</span>
              </div>
              <p className="text-xs text-neutral-300">{releaseDate} year</p>
              {totalEpisodes !== 1 && totalEpisodes ? (
                <p className="text-xs text-neutral-300">{totalEpisodes} episodes</p>
              ) : null}
            </div>
            {status === 'Ongoing' ? <p className="text-red text-xs md:text-sm">Ongoing</p> : null}
          </div>
          <div className="py-2.5 px-2.5 flex-1 flex flex-col justify-between hidden">
            <div className="flex flex-col justify-between h-full">
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
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
