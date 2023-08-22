import * as types from '@/types'
import Link from 'next/link'
import { FC, memo } from 'react'

interface Props extends types.Episode {
  choosedEpisode: string
  className?: string
  onChoose: (id: string) => void
}

const Episode: FC<Props> = ({ id, number, choosedEpisode, className, onChoose }) => {
  return (
    <li
      className={`py-2.5 bg-black/60 h-fit rounded text-center text-white/60 hover:text-white cursor-pointer px-6 ${className} ${
        choosedEpisode === id
          ? 'text-gray-900 bg-white/20 text-white/85 lg:bg-white/40 lg:text-white/90 font-medium'
          : ''
      }`}
      onClick={() => onChoose(id)}
    >
      <span>Episode {number}</span>
    </li>
  )
}

export default memo(Episode)
