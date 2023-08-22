import { useEffect, useRef } from 'react'
import { usePlayer } from './usePlayerContext'

const useStalling = () => {
  const {
    setVideoState,
    videoState: { playedSeconds, loadedSeconds, isLoading, playing },
  } = usePlayer()

  const lastPlayedSecond = useRef<number>()

  const stalledTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    clearTimeout(stalledTimeout.current)

    if (isLoading && Math.abs((lastPlayedSecond.current || 0) - playedSeconds) < 2) {
      setVideoState((prev) => ({ ...prev, isLoading: false }))
    }

    lastPlayedSecond.current = playedSeconds

    stalledTimeout.current = setTimeout(() => {
      if (playing) {
        setVideoState((prev) => ({ ...prev, isLoading: true }))
      }
    }, 1000)
  }, [playedSeconds, loadedSeconds])
}

export default useStalling
