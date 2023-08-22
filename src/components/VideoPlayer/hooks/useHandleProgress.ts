import { OnProgressProps } from 'react-player/base'
import { usePlayer } from './usePlayerContext'
import { useCallback } from 'react'

const useHandleProgress = () => {
  const { setVideoState, videoState } = usePlayer()

  const callback = useCallback(
    (progress: OnProgressProps) => {
      setVideoState({
        loadedPercentages: progress.loaded,
        loadedSeconds: progress.loadedSeconds,
        playedPercentages: progress.played,
        playedSeconds: Number(progress.playedSeconds.toFixed(5)),
      })
    },
    [videoState]
  )

  return callback
}

export default useHandleProgress
