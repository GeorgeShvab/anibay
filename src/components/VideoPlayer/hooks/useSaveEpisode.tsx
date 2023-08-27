import { useEffect, useRef } from 'react'
import { usePlayer } from './usePlayerContext'
import getCookie from '@/utils/getCookie'
import setCookie from '@/utils/setCookie'

const useSaveEpisode = () => {
  const isSaved = useRef<boolean>(false)

  const {
    videoState: { episode, id, playedSeconds },
  } = usePlayer()

  useEffect(() => {
    isSaved.current = false
  }, [episode.id])

  useEffect(() => {
    if (playedSeconds && !isSaved.current) {
      try {
        let cookie = getCookie('episodes')

        let data

        try {
          if (!cookie) throw new Error()
          data = JSON.parse(cookie)
        } catch (e) {
          data = {}
        }

        if (!data[id]) {
          data[id] = {}
        }

        data[id] = episode.id

        setCookie({ name: 'episodes', value: JSON.stringify(data), expires: 1000 * 60 * 60 * 24 * 1000, path: '/' })

        isSaved.current = false
      } catch (e) {}
    }
  }, [Math.round(playedSeconds / 5)])
}

export default useSaveEpisode
