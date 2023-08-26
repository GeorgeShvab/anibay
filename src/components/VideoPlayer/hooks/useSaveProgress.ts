import { useEffect } from 'react'
import { usePlayer } from './usePlayerContext'

const useSaveProgress: () => void = () => {
  const {
    videoState: { episode, playedPercentages, playedSeconds },
  } = usePlayer()

  const id = episode.id

  useEffect(() => {
    if (typeof window === 'undefined' || !playedSeconds) return

    try {
      let progress = window.localStorage.getItem('progress')

      let data

      try {
        if (!progress) throw new Error()
        data = JSON.parse(progress)
      } catch (e) {
        data = {}
      }

      if (!data[id]) {
        data[id] = {}
      }

      data[id].playedPercentages = playedPercentages
      data[id].playedSeconds = playedSeconds

      window.localStorage.setItem('progress', JSON.stringify(data))
    } catch (e) {}
  }, [playedPercentages, playedSeconds, id])
}

export default useSaveProgress
