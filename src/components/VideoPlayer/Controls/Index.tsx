import { FC, useEffect, useRef } from 'react'
import Track from './Track'
import debounce from '@/utils/debounce'
import Counter from './Counter'
import FullScreenButton from './FullScreenButton'
import { usePlayer } from '../hooks/usePlayerContext'
import PlayPauseButton from './PlayPauseButton'
import Overlay from './Overlay'
import Title from './Title'
import Episodes from './Episodes'
import LoadingBar from '@/components/LoadingBar'
import SettingsContainer from './Settings/SettingsContainer'

const Controls: FC = () => {
  let time = useRef<NodeJS.Timeout>()

  const {
    pause,
    play,
    hideControls,
    showControls,
    videoState: {
      playing,
      playedSeconds,
      duration,
      fullscreen,
      title,
      episodes,
      type,
      isLoading,
      isControlsShown,
      episode,
    },
  } = usePlayer()

  useEffect(() => {
    if (playing && !isLoading) {
      time.current = setTimeout(() => {
        hideControls()
      }, 3500)
    } else {
      showControls()
    }

    return () => {
      clearTimeout(time.current)
    }
  }, [playing, isControlsShown, isLoading])

  const handleMouseMove = debounce(() => {
    clearTimeout(time.current)

    showControls()

    time.current = setTimeout(() => {
      hideControls()
    }, 3500)
  }, 25)

  return (
    <div
      className={`transition-opacity${!isControlsShown ? ' opacity-0 cursor-[none]' : ''}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {fullscreen && <LoadingBar className="absolute" />}
      <Title fullscreen={fullscreen} title={title} episode={episode} type={type} />
      {episodes.length !== 1 && type !== 'MOVIE' ? <Episodes /> : null}
      <Overlay />
      <div className="absolute bottom-0 left-0 w-full p-0.5 px-1 sm:px-2 sm:py-1.5 lg:p-2 flex">
        <div className="flex items-center w-full lg:gap-2">
          <PlayPauseButton playing={playing} onPause={pause} onPlay={play} />
          <Counter duration={duration} playedSeconds={playedSeconds} />
          <Track />
          <SettingsContainer />
          <FullScreenButton />
        </div>
      </div>
    </div>
  )
}

export default Controls
