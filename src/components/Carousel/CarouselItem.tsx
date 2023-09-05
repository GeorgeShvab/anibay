import { Anime } from '@/types'
import { FC } from 'react'
import Image from 'next/image'
import Stars from '../Stars'
import PlayButton from '../PlayButton'

interface Props extends Anime {
  isSelected: boolean
  onMouseEnter: (id: string) => void
  onMouseLeave: (id: string) => void
}

const CarouselItem: FC<Props> = ({
  cover,
  id,
  title,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  totalEpisodes,
  releaseDate,
  rating,
  image,
}) => {
  return (
    <div
      className={`left-0 right-0 top-0 bottom-0 absolute md:rounded-lg overflow-hidden md:relative transition-all duration-500 basis-[100vw] md:basis-[600px] lg:basis-[700px] xl:basis-[900px] ${
        isSelected ? 'md:grow-1 md:shrink-0 z-10 opacity-100' : 'md:grow-0 md:shrink-1 z-0 opacity-0 md:opacity-100'
      }`}
      onMouseLeave={() => onMouseLeave(id)}
      onMouseEnter={() => onMouseEnter(id)}
    >
      <div className="h-[500px] md:h-[280px] w-[100vw] md:w-[600px] lg:w-[700px] xl:w-[900px] relative md:static">
        <Image
          src={image}
          alt={title}
          className={`w-full h-full md:hidden`}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          fill
        />
        <Image
          src={cover || image}
          alt={title}
          className={`w-full h-full hidden md:block`}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          fill
        />
        <div
          className={`h-[500px] md:h-[280px] w-[100vw] md:w-[600px] lg:w-[700px] xl:w-[900px] main-poster-gradient absolute left-0 top-0 right-0 bottom-0 transition-all ${
            isSelected ? '' : 'pointer-events-none'
          }`}
        >
          <div
            className={`duration-300 transition-opacity flex gap-12 justify-between p-3 md:p-6 h-full ${
              isSelected ? '' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col justify-end">
              <h2 className={`text-white font-bold mb-4 text-2xl md:text-3xl`}>{title}</h2>
              <div className="flex gap-2.5 md:gap-3 md:gap-4 items-center">
                <Stars rating={rating} />
                <p className="text-sm md:text-base text-gray-200 ml-4 whitespace-nowrap">{releaseDate} year</p>
                {totalEpisodes !== 1 && totalEpisodes ? (
                  <p className="text-sm md:text-base text-gray-200 whitespace-nowrap">{totalEpisodes} episodes</p>
                ) : null}
              </div>
            </div>
            <div className="absolute md:static left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] md:translate-x-0 md:translate-y-0 md:flex justify-center items-center flex-[0_0_160px]">
              <PlayButton
                className="h-16 w-16 md:!h-[80px] md:!w-[80px] hover:scale-105 transition-all"
                iconClassName="h-8 w-8 md:h-10 md:w-10"
                href={`/watch/${id}`}
                aria-label={`Watch ${title}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem
