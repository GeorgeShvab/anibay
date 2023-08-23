import { Anime } from '@/types'
import Link from 'next/link'
import { FC } from 'react'

const HorizontalPoster: FC<Anime> = (anime) => {
  return (
    <div className="w-full relative">
      <Link href={`/watch/${anime.id}`}>
        <div
          className="w-full h-48 px-4 py-4 lg:px-6 lg:py-4 rounded-lg flex flex-col justify-end"
          style={{
            backgroundImage: `linear-gradient(90deg,
            #060606aa 0%,
            #06060600 50%
),
url(${anime.cover})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <h2 className="text-white text-base md:text-lg lg:text-xl font-bold mb-3">{anime.title}</h2>
          <div className="flex gap-2.5 md:gap-3 md:gap-4 items-center">
            <div className="flex gap-2 md:gap-3 items-center">
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
              <span className="text-xs text-neutral-200">{anime.rating / 10}/10</span>
            </div>
            <p className="text-xs text-neutral-200 ml-4">{anime.releaseDate} year</p>
            {anime.totalEpisodes !== 1 && anime.totalEpisodes ? (
              <p className="text-xs text-neutral-200">{anime.totalEpisodes} episodes</p>
            ) : null}
            {anime.status === 'Ongoing' ? <p className="text-red text-sm">Ongoing</p> : null}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HorizontalPoster
