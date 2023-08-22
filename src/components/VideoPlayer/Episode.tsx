import * as types from '@/types'
import removeEpisode from '@/utils/removeEpisode'
import Link from 'next/link'
import { FC, memo } from 'react'

interface Props extends types.Episode {
  choosed: boolean
  onChoose: (id: string) => void
}

const Episode: FC<Props> = ({ id, number, choosed, onChoose }) => {
  return (
    <li
      className={`text-xs md:text-sm py-2 aspect-square bg-black h-fit rounded text-center text-white/60 hover:text-white flex justify-center items-center cursor-pointer px-2 ${
        choosed ? 'text-gray-900 bg-red text-white/85 lg:bg-red lg:text-white/90 font-medium' : ''
      }`}
      onClick={() => onChoose(id)}
    >
      <span>{number}</span>
    </li>
  )
}

export default memo(Episode)
