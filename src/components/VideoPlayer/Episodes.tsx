import * as types from '@/types'
import { FC } from 'react'
import Episode from './Episode'
import { usePlayer } from './hooks/usePlayerContext'

const Episodes: FC = () => {
  const {
    videoState: { episode, type, episodes },
    toEpisode,
  } = usePlayer()

  if (type === 'MOVIE') {
    return null
  }

  return (
    <div className={'pl-2 pt-2'}>
      <ul className="episodes-container h-fit max-h-[16rem] overflow-y-scroll grid grid-cols-[repeat(8,1fr)] xs:grid-cols-[repeat(12,1fr)] sm:grid-cols-[repeat(16,1fr)] lg:grid-cols-[repeat(20,1fr)] xl:grid-cols-[repeat(26,1fr)] gap-1">
        {episodes.map((item) => (
          <Episode key={item.id} choosed={item.id === episode?.id} onChoose={toEpisode} {...item} />
        ))}
      </ul>
    </div>
  )
}

export default Episodes
