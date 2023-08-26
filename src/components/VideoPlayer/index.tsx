import { AnimeType, Episode } from '@/types'
import { FC } from 'react'
import Player from './Player'

interface Props {
  title: string
  episodes: Episode[]
  type: AnimeType
  id: string
}

const VideoPlayer: FC<Props> = (props) => {
  return <Player {...props} />
}

export default VideoPlayer
