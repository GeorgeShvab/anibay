import { FC, memo, MouseEvent } from 'react'
import { usePlayer } from '../hooks/usePlayerContext'

const Overlay: FC = () => {
  const {
    setVideoState,
    play,
    pause,
    videoState: { isControlsShown, playing, fullscreen, isLoading },
    player,
  } = usePlayer()

  const handleOverlayClick = (e: MouseEvent) => {
    if (window.innerWidth < 1024 && !isControlsShown) return

    if (playing) {
      pause()
    } else {
      play()
    }
  }

  const handleButtonClick = (e: MouseEvent) => {
    e.currentTarget.parentElement?.focus()
    if (playing) {
      pause()
    } else {
      play()
    }
  }

  const handleDoubleClickLeft = (e: MouseEvent) => {
    e.stopPropagation()
    setVideoState((prev) => {
      const newPlayedSeconds = prev.playedSeconds - 10 > 0 ? prev.playedSeconds - 10 : 0
      const newPlayedPercentages = newPlayedSeconds / prev.duration > 0 ? newPlayedSeconds / prev.duration : 0

      player.current?.seekTo(newPlayedSeconds)

      return {
        ...prev,
        playedSeconds: newPlayedSeconds,
        playedPercentages: newPlayedPercentages,
      }
    })
  }

  const handleDoubleClickRight = (e: MouseEvent) => {
    e.stopPropagation()
    setVideoState((prev) => {
      const newPlayedSeconds = prev.playedSeconds + 10 < prev.duration ? prev.playedSeconds + 10 : prev.duration
      const newPlayedPercentages = newPlayedSeconds / prev.duration < 100 ? newPlayedSeconds / prev.duration : 100

      player.current?.seekTo(newPlayedSeconds)

      return {
        ...prev,
        playedSeconds: newPlayedSeconds,
        playedPercentages: newPlayedPercentages,
      }
    })
  }

  return (
    <>
      <div className="absolute bottom-0 left-0 top-0 right-0 flex" onClick={handleOverlayClick} />
      {fullscreen && (
        <>
          <div className="absolute right-2/3 bottom-1/2 translate-x-1/3 translate-y-1/2 z-50 p-8 opacity-20 lg:hidden">
            <button
              type="button"
              onDoubleClick={handleDoubleClickLeft}
              className="focus:outline-none font-medium text-sm p-2 lg:p-6 text-center inline-flex items-center"
            >
              <div className="p-4 text-white bg-white/25 rounded-full">
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
                    d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                  />
                </svg>
              </div>
              <span className="sr-only">Back</span>
            </button>
          </div>
          <div className="absolute right-1/3 bottom-1/2 translate-x-2/3 translate-y-1/2 z-50 p-8 opacity-20 lg:hidden">
            <button
              type="button"
              onDoubleClick={handleDoubleClickRight}
              className="focus:outline-none font-medium text-sm p-2 lg:p-6 text-center inline-flex items-center"
            >
              <div className="p-4 text-white bg-white/25 rounded-full">
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
                    d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                  />
                </svg>
              </div>
              <span className="sr-only">Forward</span>
            </button>
          </div>
        </>
      )}
      <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 z-50">
        {playing ? (
          isLoading ? (
            <div className="loader">
              <svg className="circular" viewBox="25 25 50 50">
                <circle
                  className="player-path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke-width="2"
                  stroke-miterlimit="10"
                />
              </svg>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleButtonClick}
              className="p-5 text-white bg-white/25 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 lg:p-6 text-center inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Pause</span>
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={handleButtonClick}
            className="p-5 text-white bg-white/25 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 lg:p-6 text-center inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Play</span>
          </button>
        )}
      </div>
    </>
  )
}

export default memo(Overlay)
