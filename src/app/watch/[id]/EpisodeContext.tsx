import { Episode } from '@/types'
import { FC, ReactElement, createContext, useContext, useState } from 'react'

export interface IEpisodeContext {
  toEpisode: (id: string) => void
  episode: Episode
  episodes: Episode[]
}

const episodeContext = createContext<IEpisodeContext>({ toEpisode: () => {}, episode: undefined as any, episodes: [] })

export const useEpisode = () => {
  const data = useContext(episodeContext)

  return data
}

const Provider = episodeContext.Provider

export const EpisodeProvider: FC<{ children: ReactElement; episodes: Episode[]; episode: Episode }> = ({
  episode,
  children,
  episodes,
}) => {
  const [state, setState] = useState<{ episode: Episode; episodes: Episode[] }>({ episode, episodes })

  const toEpisode = (id: string) => {
    setState((prev) => ({ ...prev, episode: episodes.find((item) => item.id === id) as Episode }))
  }

  return <Provider value={{ ...state, toEpisode }}>{children}</Provider>
}
