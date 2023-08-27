'use client'

import { FC, LegacyRef, useEffect, useRef } from 'react'
import ReactPlayerType, { ReactPlayerProps } from 'react-player'
import Controls from './Controls/Index'
import { PlayerProvider, usePlayerContext } from './hooks/usePlayerContext'
import { OnProgressProps } from 'react-player/base'
import useEnded from './hooks/useEnded'
import { getProgress } from './hooks/useGetProgress'
import { AnimeType, Episode } from '@/types'
import Episodes from '@/components/VideoPlayer/Episodes'
import Hooks from './hooks/Hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import getHighestQuality from './getHighestquality'

const ReactPlayerWrapper = dynamic(() => import('./ReactPlayerWrapper'), { ssr: false })

interface Props {
  title: string
  episodes: Episode[]
  type: AnimeType
  id: string
}

const Player: FC<Props> = ({ title, episodes, type, id }) => {
  const episode = useSearchParams()?.get('episode')

  let initialEpisode

  if (episode && episodes.find((item) => item.id === episode)) {
    initialEpisode = episodes.find((item) => item.id === episode) as Episode
  } else {
    initialEpisode = episodes[0]
  }

  const playerRef = useRef<ReactPlayerType>(null)

  const playerContainerRef = useRef<HTMLDivElement>(null)

  let defaultQuality = getHighestQuality(initialEpisode.sources)

  const value = usePlayerContext({
    title,
    episodes,
    type,
    id,
    player: playerRef,
    episode: initialEpisode,
    choosedQuality: defaultQuality,
    container: playerContainerRef,
  })

  const progress = getProgress(value.videoState.episode.id)

  const handleDuration = (e: number) => {
    value.setVideoState({ duration: e })
  }

  const handleReady = () => {
    playerRef.current?.seekTo(progress.playedSeconds)
    value.setVideoState((prev) => ({ ...prev, ...progress }))
  }

  const handleEnded = useEnded({
    episode: value.videoState.episode,
    episodes: value.videoState.episodes,
    toEpisode: value.toEpisode,
  })

  const handleProgress = (progress: OnProgressProps) => {
    value.setVideoState({
      loadedPercentages: progress.loaded,
      loadedSeconds: progress.loadedSeconds,
      playedPercentages: progress.played,
      playedSeconds: Number(progress.playedSeconds.toFixed(5)),
    })
  }

  return (
    <PlayerProvider value={value}>
      <div className="rounded overflow-hidden bg-dark shadow-3xl pb-2">
        <div
          className="p-2 pb-0"
          style={{
            aspectRatio: '1.7777777 / 1',
          }}
        >
          <div className="rounded overflow-hidden">
            <div
              className="relative z-10 overflow-hidden w-100"
              id="player-container"
              ref={playerContainerRef}
              style={{
                aspectRatio: '1.7777777 / 1',
              }}
            >
              <div className="w-full h-full flex justify-center items-center bg-[#000000]">
                <Hooks />
                <ReactPlayerWrapper
                  controls={false}
                  autoPlay={false}
                  url={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/proxy/${
                    value.videoState.episode.sources.find((item) => item.quality === value.videoState.choosedQuality)
                      ?.url
                  }`}
                  width="100%"
                  height="100%"
                  player={playerRef}
                  playing={value.videoState.playing}
                  onPause={value.pause}
                  onPlay={value.play}
                  volume={value.videoState.volume}
                  onReady={handleReady}
                  onProgress={handleProgress}
                  style={{
                    aspectRatio: '1.7777777 / 1',
                  }}
                  onDuration={handleDuration}
                  onEnded={handleEnded}
                  progressInterval={250}
                />
              </div>
              <Controls />
            </div>
          </div>
        </div>
        <Episodes />
      </div>
    </PlayerProvider>
  )
}

export default Player
