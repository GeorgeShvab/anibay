import formatPlayerTime from '@/utils/formatPlayerTime'
import throttle from '@/utils/throttle'
import { FC, MouseEvent, TouchEvent, memo, useCallback, useMemo, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { usePlayer } from '../hooks/usePlayerContext'

const Track: FC = () => {
  const {
    player,
    setVideoState,
    videoState: { duration, loadedPercentages, episode, playedPercentages },
  } = usePlayer()

  let isDown = useRef<boolean>(false)

  const hiddenPlayerRef = useRef<ReactPlayer>(null)

  const [framePreview, setFramePreview] = useState<{ percents: number; seconds: number; isOpened: boolean }>({
    percents: 0,
    isOpened: false,
    seconds: 0,
  })

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      isDown.current = true

      if (player.current) {
        let position = (e.pageX - e.currentTarget.getClientRects()[0].left) / e.currentTarget.clientWidth

        if (position < 0) {
          position = 0
        } else if (position > 1) {
          position = 1
        }

        const minutes = position * duration

        const seconds = minutes < duration ? minutes : duration

        player.current.seekTo(Number(seconds.toFixed(5)))

        setVideoState({
          playedSeconds: Number(seconds.toFixed(5)),
          playedPercentages: position,
        })
      }
    },
    [duration]
  )

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (isDown.current && player.current) {
        let position = (e.pageX - e.currentTarget.getClientRects()[0].left) / e.currentTarget.clientWidth

        if (position < 0) {
          position = 0
        } else if (position > 1) {
          position = 1
        }

        const minutes = position * duration

        const seconds = minutes < duration ? minutes : duration

        hiddenPlayerRef.current?.seekTo(seconds)

        setFramePreview({ percents: position, isOpened: true, seconds })

        player.current.seekTo(Number(seconds.toFixed(5)))

        setVideoState({
          playedSeconds: Number(seconds.toFixed(5)),
          playedPercentages: position,
        })
      }
      if (player.current) {
        let position = (e.pageX - e.currentTarget.getClientRects()[0].left) / e.currentTarget.clientWidth

        if (position < 0) {
          position = 0
        } else if (position > 1) {
          position = 1
        }

        const minutes = position * duration

        const seconds = minutes < duration ? minutes : duration

        hiddenPlayerRef.current?.seekTo(seconds)

        setFramePreview({ percents: position, isOpened: true, seconds })
      }
    }, 25),
    [duration]
  )

  const handleMouseUp = () => {
    isDown.current = false

    setFramePreview((prev) => ({ ...prev, isOpened: false }))
  }

  const handleTouchMove = useCallback(
    throttle((e: TouchEvent<HTMLDivElement>) => {
      if (player.current) {
        let position = (e.touches[0].pageX - e.currentTarget.getClientRects()[0].left) / e.currentTarget.clientWidth

        if (position < 0) {
          position = 0
        } else if (position > 1) {
          position = 1
        }

        const minutes = position * duration

        const seconds = minutes < duration ? minutes : duration

        player.current.seekTo(Number(seconds.toFixed(5)))

        setVideoState({
          playedSeconds: Number(seconds.toFixed(5)),
          playedPercentages: position,
        })
      }
      if (player.current) {
        let position = (e.touches[0].pageX - e.currentTarget.getClientRects()[0].left) / e.currentTarget.clientWidth

        if (position < 0) {
          position = 0
        } else if (position > 1) {
          position = 1
        }

        const minutes = position * duration

        const seconds = minutes < duration ? minutes : duration

        hiddenPlayerRef.current?.seekTo(seconds)

        setFramePreview({ percents: position, isOpened: true, seconds })
      }
    }, 25),
    [duration]
  )

  const canvas1 = useRef<HTMLCanvasElement>(null)

  function extractFrameAndSave() {
    if (!canvas1.current || !hiddenPlayerRef.current) return

    const context = canvas1.current.getContext('2d')

    const canvas = canvas1.current

    const video = hiddenPlayerRef.current.getInternalPlayer() as HTMLVideoElement

    canvas.width = video.videoWidth / 4
    canvas.height = video.videoHeight / 4
    context?.drawImage(video, 0, 0, canvas.width, canvas.height)
  }

  const quality = useMemo(
    () =>
      episode.sources.reduce<string>((prev, curr) => {
        if (isNaN(Number(curr.quality.replace('p', '')))) return prev
        if (isNaN(Number(prev.replace('p', '')))) return curr.quality

        if (Number(curr.quality.replace('p', '')) < Number(prev.replace('p', ''))) {
          return curr.quality
        } else {
          return prev
        }
      }, 'default'),
    [episode.id]
  )

  return (
    <div className="flex-auto px-2 pl-4 lg:pt-0.5">
      <div className="relative">
        {framePreview.isOpened && (
          <div
            className="absolute z-50 bottom-8 translate-x-[-50%] flex flex-col gap-3 items-center"
            style={{ left: (framePreview?.percents || 0) * 100 + '%' }}
          >
            <canvas id="myCanvas" className="rounded" ref={canvas1} />
            <span className="text-white text-xs">{formatPlayerTime(framePreview.seconds)}</span>
          </div>
        )}

        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="py-2 lg:py-3 group"
        >
          <div className="h-1 group-hover bg-white/20 rounded-lg relative overflow-hidden">
            <span
              className={`h-1 group-hover bg-white/25 block absolute top-0 left-0`}
              style={{ width: loadedPercentages * 100 + '%' }}
            />
            <span
              className={`h-1 group-hover bg-red block absolute top-0 left-0`}
              style={{ width: playedPercentages * 100 + '%' }}
            />
          </div>
          <span
            className="rounded-full bg-white z-10 block w-2.5 h-2.5 absolute top-1/2 translate-x-[-50%] translate-y-[-50%]"
            style={{
              left: playedPercentages * 100 + '%',
            }}
          />
          <div className="invisible absolute">
            {typeof window !== 'undefined' && (
              <ReactPlayer
                controls={false}
                autoPlay={false}
                url={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/proxy/${
                  episode.sources.find((item) => item.quality === quality)?.url
                }`}
                width="100%"
                height="100%"
                ref={hiddenPlayerRef}
                playing={false}
                style={{
                  aspectRatio: '1.7777777 / 1',
                  height: '100px',
                }}
                onSeek={extractFrameAndSave}
                muted
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Track)
