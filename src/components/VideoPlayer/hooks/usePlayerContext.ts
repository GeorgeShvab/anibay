import { AnimeType, Episode, Source } from '@/types'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useMemo, RefObject } from 'react'
import { createContext, useContext } from 'react'
import ReactPlayer from 'react-player'
import { getProgress } from './useGetProgress'

export interface VideoState {
  playing: boolean
  muted: boolean
  volume: number
  loaded: number
  seeking: boolean
  Buffer: boolean
  playedSeconds: number
  playedPercentages: number
  loadedSeconds: number
  loadedPercentages: number
  duration: number
  fullscreen: boolean
  title: string
  episode: Episode
  episodes: Episode[]
  choosedQuality: string
  type: AnimeType
  id: string
  isLoading: boolean
  isControlsShown: boolean
}

interface ContextState {
  videoState: VideoState
  setVideoState: (arg: Partial<VideoState> | ((arg: VideoState) => VideoState)) => void
  pause: () => void
  play: () => void
  togglePlaying: () => void
  toggleControls: () => void
  hideControls: () => void
  showControls: () => void
  toEpisode: (id: string) => void
  exitFullscreen: () => void
  enterFullscreen: () => void
  toggleFullscreen: () => void
  player: RefObject<ReactPlayer>
  container: RefObject<HTMLDivElement>
}

const initialVideoState: VideoState = {
  playing: false,
  muted: false,
  volume: 1,
  loaded: 0,
  seeking: false,
  Buffer: true,
  playedSeconds: 0,
  playedPercentages: 0,
  loadedSeconds: 0,
  loadedPercentages: 0,
  duration: 0,
  fullscreen: false,
  title: '',
  episodes: [],
  choosedQuality: '',
  type: 'SERIAL',
  id: '',
  isLoading: false,
  isControlsShown: true,
  episode: {} as any,
}

export const PlayerContext = createContext<ContextState>({
  videoState: initialVideoState,
  setVideoState: () => {},
  pause: () => {},
  play: () => {},
  togglePlaying: () => {},
  toggleControls: () => {},
  hideControls: () => {},
  showControls: () => {},
  toEpisode: () => {},
  toggleFullscreen: () => {},
  exitFullscreen: () => {},
  enterFullscreen: () => {},
  player: null as any,
  container: null as any,
})

export const PlayerProvider = PlayerContext.Provider

export const usePlayer = () => {
  const data = useContext(PlayerContext)

  return data
}

export const usePlayerContext = (
  defaultState: Partial<VideoState> & { player: RefObject<ReactPlayer>; container: RefObject<HTMLDivElement> }
): ContextState => {
  const { player, container, ...initialState } = defaultState

  const pathname = usePathname()

  const router = useRouter()

  const [state, setState] = useState<VideoState>({
    ...initialVideoState,
    ...initialState,
  })

  const setVideoState = (arg: Partial<VideoState> | ((arg: VideoState) => VideoState)) => {
    if (typeof arg === 'object') {
      setState((prev) => ({ ...prev, ...arg }))
    } else {
      setState(arg)
    }
  }

  const play = () => {
    setVideoState((prev) => ({ ...prev, playing: true }))
  }

  const pause = () => {
    setVideoState((prev) => ({ ...prev, playing: false }))
  }

  const togglePlaying = () => {
    setVideoState((prev) => ({ ...prev, playing: !prev.playing }))
  }

  const toggleControls = () => {
    setVideoState((prev) => ({ ...prev, isControlsShown: !prev.isControlsShown }))
  }

  const hideControls = () => {
    setVideoState((prev) => ({ ...prev, isControlsShown: false }))
  }

  const showControls = () => {
    setVideoState((prev) => ({ ...prev, isControlsShown: true }))
  }

  const toggleFullscreen = () => {
    setVideoState((prev) => ({ ...prev, fullscreen: !prev.fullscreen }))
  }

  const enterFullscreen = () => {
    setVideoState((prev) => ({ ...prev, fullscreen: true }))
  }

  const exitFullscreen = () => {
    setVideoState((prev) => ({ ...prev, fullscreen: false }))
  }

  const toEpisode = (id: string) => {
    router.push(pathname + '?episode=' + id, { scroll: false })

    setVideoState((prev) => ({
      ...prev,
      episode: prev.episodes.find((item) => item.id === id) || prev.episode,
      loadedSeconds: 0,
      loadedPercentages: 0,
      ...getProgress(id),
    }))
  }

  const data = useMemo(() => {
    return {
      videoState: state,
      setVideoState: setVideoState,
      play,
      pause,
      togglePlaying,
      toggleControls,
      hideControls,
      showControls,
      exitFullscreen,
      enterFullscreen,
      toggleFullscreen,
      player,
      toEpisode,
      container,
    }
  }, [state])

  return data
}