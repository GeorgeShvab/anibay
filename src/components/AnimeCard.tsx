import { Anime } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC, memo } from 'react'

const AnimeCard: FC<Anime & { className?: string; containerClassName?: string }> = ({
  title,
  image,
  id,
  releaseDate,
  totalEpisodes,
  status,
  className,
  containerClassName,
}) => {
  return (
    <div className={`rounded group hover:scale-[1.025] transition-all shadow-xl ${containerClassName}`}>
      <Link href={`/watch/${id}`} className="h-full block">
        <div
          className={`h-full bg-dark group-hover:bg-dark-light rounded transition-all cursor-pointer ${
            className ? className : ''
          }`}
        >
          <div className="relative h-64 md:h-20 w-auto rounded-t overflow-hidden shadow-2xl">
            <Image src={image} alt={title} style={{ objectFit: 'cover' }} fill />
          </div>
          <div className="p-2 md:p-3">
            <h3 className="text-neutral-100 font-medium text-0.5xs md:text-[15px] mb-1 md:mb-2">{title}</h3>
            <div className="flex gap-3 mb-1">
              <p className="text-xs text-gray-500 md:text-sm">{releaseDate} year</p>
              {totalEpisodes !== 1 && totalEpisodes ? (
                <p className="text-xs text-gray-500 md:text-sm">{totalEpisodes} episodes</p>
              ) : null}
            </div>
            {status === 'Ongoing' ? <p className="text-red text-xs md:text-sm">Ongoing</p> : null}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default memo(AnimeCard)
