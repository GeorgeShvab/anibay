import * as React from 'react'
import { usePlayer } from './usePlayerContext'

const useKeys: () => void = (): void => {
  const { setVideoState, togglePlaying, player } = usePlayer()

  const handleKeyDown = (e: KeyboardEvent) => {
    const playerTop = player?.current?.getInternalPlayer().getBoundingClientRect().top

    const playerBottom = player?.current?.getInternalPlayer().getBoundingClientRect().bottom

    if (
      (window.screenTop > playerTop - window.innerHeight / 2 &&
        window.screenTop < playerBottom - window.innerHeight / 2) ||
      document.fullscreenElement
    ) {
      if (e.code === 'Space') {
        e.preventDefault()
        togglePlaying()
      } else if (e.code === 'ArrowRight') {
        setVideoState((prev) => {
          const newPlayedSeconds = prev.playedSeconds + 10 < prev.duration ? prev.playedSeconds + 10 : prev.duration
          const newPlayedPercentages = newPlayedSeconds / prev.duration < 100 ? newPlayedSeconds / prev.duration : 100

          player?.current?.seekTo(newPlayedSeconds)

          return {
            ...prev,
            playedSeconds: newPlayedSeconds,
            playedPercentages: newPlayedPercentages,
          }
        })
      } else if (e.code === 'ArrowLeft') {
        setVideoState((prev) => {
          const newPlayedSeconds = prev.playedSeconds - 10 > 0 ? prev.playedSeconds - 10 : 0
          const newPlayedPercentages = newPlayedSeconds / prev.duration > 0 ? newPlayedSeconds / prev.duration : 0

          player?.current?.seekTo(newPlayedSeconds)

          return {
            ...prev,
            playedSeconds: newPlayedSeconds,
            playedPercentages: newPlayedPercentages,
          }
        })
      }
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export default useKeys
