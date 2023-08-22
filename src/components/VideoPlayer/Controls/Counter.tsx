import formatPlayerTime from '@/utils/formatPlayerTime'
import { FC, memo } from 'react'

interface PropsType {
  playedSeconds: number
  duration: number
}

const Counter: FC<PropsType> = ({ duration, playedSeconds }) => {
  const time = `${formatPlayerTime(playedSeconds)} / ${formatPlayerTime(duration)}`

  return (
    <span className="text-white text-xs lg:text-base" style={{ width: `calc(${time.length} * 0.51em)` }}>
      {time}
    </span>
  )
}

export default memo(Counter)
