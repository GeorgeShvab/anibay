import { LegacyRef } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'

export default function ReactPlayerWrapper({
  player,
  ...props
}: ReactPlayerProps & {
  player: LegacyRef<ReactPlayer>
}) {
  return <ReactPlayer ref={player} {...props} />
}
