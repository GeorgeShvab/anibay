import { Episode } from '@/types'

interface Params {
  episodes: Episode[]
  episode: Episode
  toEpisode: (id: string) => void
}

const useEnded: (params: Params) => () => void = ({ episode, episodes, toEpisode }: Params) => {
  return () => {
    if (episode.number < episodes.length) {
      const nextEpisode = episodes.find((item) => item.number === episode.number + 1)

      if (nextEpisode) {
        toEpisode(nextEpisode.id)
      }
    }
  }
}

export default useEnded
