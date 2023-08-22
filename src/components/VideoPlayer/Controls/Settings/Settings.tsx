import { FC, Fragment, RefObject, memo, useEffect, useRef, useState } from 'react'
import { Source } from '@/types'
import ReactPlayer from 'react-player'
import useOutsideClick from '@/hooks/useOutsideClick'
import { Menu, Popover, Transition } from '@headlessui/react'
import IconButton from '@/ui/IconButton'
import axios from 'axios'
import { usePopper } from 'react-popper'
import Quality from '../Quality'
import Volume from '../Volume'
import { usePlayer } from '../../hooks/usePlayerContext'

interface PropsType {
  open: boolean
  close: () => void
}

const Settings: FC<PropsType> = ({ open, close }) => {
  const time = useRef<NodeJS.Timeout>()

  const { videoState, setVideoState, player } = usePlayer()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!videoState.isControlsShown) {
      close()
    }
  }, [videoState.isControlsShown])

  useOutsideClick(containerRef, close)

  const handleMouseLeave = () => {
    time.current = setTimeout(() => {
      close()
    }, 3500)
  }

  const handleMouseEnter = () => {
    clearTimeout(time.current)
  }

  const handleChangeQuality = (quality: string) => {
    setVideoState({
      choosedQuality: quality,
    })
  }

  const setVolume = (arg: number) => {
    setVideoState({ volume: arg })
  }

  return (
    <div
      className="p-3 overflow-hidden bottom-14 rounded bg-black/80 lg:bg-black/60 flex flex-col gap-2"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Quality
        sources={videoState.episode.sources}
        choosedQuality={videoState.choosedQuality}
        handleChangeQuality={handleChangeQuality}
      />
      <Volume muted={videoState.muted} volume={videoState.volume} playerRef={player} setVolume={setVolume} />
    </div>
  )
}

export default memo(Settings)
