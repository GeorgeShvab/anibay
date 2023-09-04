import { FC, memo, useEffect } from 'react'
import { usePlayer } from '../hooks/usePlayerContext'

const FullScreenButton: FC = () => {
  const {
    exitFullscreen,
    enterFullscreen,
    toggleFullscreen,
    container,
    videoState: { fullscreen },
  } = usePlayer()

  const handleOpenFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }

    container.current?.requestFullscreen()
  }

  const handleCloseFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  const handleFullscreen = (e: Event) => {
    if (document.fullscreenElement) {
      enterFullscreen()
    } else {
      exitFullscreen()
    }
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreen)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreen)
    }
  }, [])

  return (
    <div>
      {fullscreen ? (
        <button
          type="button"
          onClick={handleCloseFullScreen}
          className="text-white hover:bg-gray-200/25 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 lg:p-2 lg:p-2 text-center inline-flex items-center"
          aria-label="Exit fullscreen mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
            />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleOpenFullscreen}
          className="text-white hover:bg-gray-200/25 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 lg:p-2 text-center inline-flex items-center"
          aria-label="Enter fullscreen mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default memo(FullScreenButton)
