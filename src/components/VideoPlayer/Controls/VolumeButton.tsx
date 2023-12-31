import throttle from '@/utils/throttle'
import { FC, RefObject, useCallback, useRef, MouseEvent, memo } from 'react'
import ReactPlayer from 'react-player'

interface PropsType {
  muted: boolean
  volume: number
  playerRef: RefObject<ReactPlayer>
  setVolume: (arg: number) => void
}

const Volume: FC<PropsType> = ({ muted, volume, playerRef, setVolume }) => {
  const isDown = useRef<boolean>(false)

  const handleMouseDown = (e: MouseEvent) => {
    isDown.current = true

    if (isDown.current) {
      let position = 1 - (e.pageY - e.currentTarget.getClientRects()[0].top) / e.currentTarget.clientHeight

      if (position < 0) {
        position = 0
      } else if (position > 1) {
        position = 1
      }

      setVolume(position)
    }
  }

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (isDown.current && playerRef.current) {
        let position = 1 - (e.pageY - e.currentTarget.getClientRects()[0].top) / e.currentTarget.clientHeight

        if (position < 0) {
          position = 0
        } else if (position > 1) {
          position = 1
        }

        setVolume(position)
      }
    }, 10),
    []
  )

  const handleMouseUp = () => {
    isDown.current = false
  }

  return (
    <div className="flex-initial relative hidden lg:block group">
      <div className={`absolute pb-3 left-1/2 w-1 bottom-full transition-opacity opacity-0 group-hover:opacity-100`}>
        <div
          className="relative px-4"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ transform: 'translateX(-50%)' }}
        >
          <div className="w-1 bg-gray-100/25 rounded-lg overflow-hidden h-20" style={{ transform: 'translateX(-50%)' }}>
            <span className={`w-1 bg-white/75 block absolute bottom-0 left-0`} style={{ height: volume * 100 + '%' }} />
          </div>
          <span
            className="rounded-full bg-white z-10 block w-2.5 h-2.5 absolute"
            style={{
              transform: 'translate(-50%, 50%)',
              bottom: volume * 100 + '%',
              left: '50%',
            }}
          />
        </div>
      </div>
      {!volume ? (
        <button
          type="button"
          onClick={() => setVolume(1)}
          className="text-white hover:bg-gray-200/25 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 lg:p-2 text-center inline-flex items-center"
          aria-label="Unmute"
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
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setVolume(0)}
          className="text-white hover:bg-gray-200/25 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 lg:p-2 text-center inline-flex items-center"
          aria-label="Mute"
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
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default memo(Volume)
