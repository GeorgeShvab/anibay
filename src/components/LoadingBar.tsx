'use client'

import { FC, memo, useRef, useState } from 'react'
import Router from 'next/navigation'

interface Progress {
  show: boolean
  progress: number
}

const LoadingBar: FC<{ className?: string }> = ({ className }) => {
  const firstTimeout = useRef<NodeJS.Timeout>()
  const secondTimeout = useRef<NodeJS.Timeout>()
  const thirdTimeout = useRef<NodeJS.Timeout>()

  const [progress, setProgress] = useState<Progress>({
    show: false,
    progress: 0,
  })

  const handleProgressStart = (e: any) => {
    clearTimeout(firstTimeout.current)
    clearTimeout(secondTimeout.current)
    clearTimeout(thirdTimeout.current)

    setProgress({ show: true, progress: 5 })

    firstTimeout.current = setTimeout(() => {
      setProgress((prev) => ({ ...prev, progress: 25 }))
    }, 50)

    secondTimeout.current = setTimeout(() => {
      setProgress((prev) => ({ ...prev, progress: 50 }))
    }, 300)

    thirdTimeout.current = setTimeout(() => {
      setProgress((prev) => ({ ...prev, progress: 75 }))
    }, 500)
  }

  const handleProgressEnd = (e: any) => {
    setProgress((prev) => ({ ...prev, progress: 100 }))

    clearTimeout(firstTimeout.current)
    clearTimeout(secondTimeout.current)
    clearTimeout(thirdTimeout.current)

    setTimeout(() => {
      setProgress((prev) => ({ ...prev, show: false }))
    }, 500)

    setTimeout(() => {
      setProgress((prev) => ({ progress: 0, show: false }))
    }, 750)
  }

  //Router.events.on('routeChangeStart', handleProgressStart)
  //Router.events.on('routeChangeComplete', handleProgressEnd)
  //Router.events.on('routeChangeError', handleProgressEnd)

  return (
    <div
      className={`z-50 top-0 transition-all h-0.5 bg-red opacity-${progress.show ? '50' : '0'} ${className}`}
      style={{
        width: progress.progress + '%',
        transition: '0.25s width, 0.35s opacity',
      }}
    />
  )
}

export default memo(LoadingBar)
