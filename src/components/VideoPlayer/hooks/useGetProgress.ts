import { useEffect, useState } from 'react'

interface StateType {
  playedSeconds: 0
  playedPercentages: 0
}

const useGetProgress = (id: string): StateType => {
  const [state, setState] = useState<StateType>({
    playedPercentages: 0,
    playedSeconds: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const store = window.localStorage.getItem('progress')

    let data

    try {
      if (!store) throw new Error()

      data = JSON.parse(store)

      if (!data[id]) throw new Error()
    } catch (e) {
      setState({ playedPercentages: 0, playedSeconds: 0 })
      return
    }

    setState({
      playedPercentages: data[id].playedPercentages || 0,
      playedSeconds: data[id].playedSeconds || 0,
    })
  }, [id])

  return state
}

export const getProgress = (id: string) => {
  if (typeof window === 'undefined') return { playedPercentages: 0, playedSeconds: 0 }

  const store = window.localStorage.getItem('progress')

  let data

  try {
    if (!store) throw new Error()

    data = JSON.parse(store)

    if (!data[id]) throw new Error()
  } catch (e) {
    return { playedPercentages: 0, playedSeconds: 0 }
  }

  return {
    playedPercentages: data[id].playedPercentages || 0,
    playedSeconds: data[id].playedSeconds || 0,
  }
}

export default useGetProgress
