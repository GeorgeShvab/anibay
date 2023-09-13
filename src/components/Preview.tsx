'use client'

import { FC, useRef, useState } from 'react'
import ReactPlayerClass from 'react-player'
import dynamic from 'next/dynamic'

const ReactPlayerWrapper = dynamic(() => import('./VideoPlayer/ReactPlayerWrapper'), { ssr: false })

interface Props {
  url: string
}

const Preview: FC<Props> = (props) => {
  const player = useRef<ReactPlayerClass>(null)
  const canvasEl = useRef<HTMLCanvasElement>(null)

  const [url, setUrl] = useState<string>(props.url)

  function extractFrameAndSave() {
    if (!canvasEl.current || !player.current) return

    const context = canvasEl.current.getContext('2d')

    const video = player.current.getInternalPlayer() as HTMLVideoElement

    context?.drawImage(video, 0, 0, canvasEl.current.width, canvasEl.current.height)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/*<canvas
        className="preview-canvas absolute w-full h-full top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]"
        ref={canvasEl}
  ></canvas>*/}
      <div className="absolute w-full h-full scale-[1.65] top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
        <ReactPlayerWrapper
          controls={false}
          autoPlay={false}
          url={url}
          width="100%"
          height="100%"
          player={player}
          playing={false}
          style={{
            aspectRatio: '1.7777777 / 1',
            height: '100px',
          }}
          onSeek={extractFrameAndSave}
          onReady={() => player.current?.seekTo(600)}
          onError={(e) => {
            setUrl(`${process.env.SERVER_ADDRESS}/api/proxy/${url}`)
          }}
          muted
        />
      </div>
    </div>
  )
}

export default Preview
