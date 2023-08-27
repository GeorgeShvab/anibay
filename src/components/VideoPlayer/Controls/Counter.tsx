import formatPlayerTime from '@/utils/formatPlayerTime'
import { FC, memo } from 'react'

interface PropsType {
  playedSeconds: number
  duration: number
}

const Counter: FC<PropsType> = ({ duration, playedSeconds }) => {
  const playedTime = formatPlayerTime(playedSeconds)
  const fullTime = formatPlayerTime(duration)

  return (
    <div className="text-white flex items-center gap-1 text-xs lg:text-base">
      <span className="block" style={{ width: `calc(${playedTime.length} * 0.55em)` }}>
        {playedTime}
      </span>
      <span className="block">/</span>
      <span className="block" style={{ width: `calc(${fullTime.length} * 0.55em)` }}>
        {fullTime}
      </span>
    </div>
  )
}

export default memo(Counter)
