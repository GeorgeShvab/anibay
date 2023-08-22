import { Anime } from '@/types'
import { FC } from 'react'
import AnimeCard from '@/components/AnimeCard'
import AnimeCards from '@/components/AnimeCards'

interface PropsType {
  anime: Anime[]
  title: string
}

const AnimeSlider: FC<PropsType> = ({ anime, title }) => {
  return (
    <div>
      <h2 className="mb-2 px-5 lg:px-16 lg:mb-6 text-lg font-semibold md:text-2xl px-2 text-white">{title}</h2>
      <div className="flex gap-2 items-stretch md:gap-4 lg:hidden overflow-auto no-scrollbar px-3 lg:px-10">
        {anime.map((item) => (
          <AnimeCard key={item.id} className="w-[13rem] md:w-64 h-full" {...item} />
        ))}
      </div>
      <div className="hidden lg:block container">
        <AnimeCards data={anime} />
      </div>
    </div>
  )
}

export default AnimeSlider
