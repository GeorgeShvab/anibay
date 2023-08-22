'use client'

import { useEffect, useState } from 'react'

const useMediaQuery = (min: number, max: number) => {
  let initialState = false

  if (typeof window !== 'undefined') {
    if (window.innerWidth < max && window.innerWidth > min) {
      initialState = true
    } else {
      initialState = false
    }
  }

  const [state, setState] = useState<boolean>(initialState)

  const handleResize = (e: UIEvent) => {
    console.log('resize')
    if (window.innerWidth < max && window.innerWidth > min) {
      setState(true)
    } else {
      setState(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return state
}

export default useMediaQuery
