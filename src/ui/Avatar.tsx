import { FC } from 'react'

interface Props {
  src?: string
  alt?: string
  className?: string
}

const Avatar: FC<Props> = ({ className, src, alt = 'user' }) => {
  return (
    <img src={src || '/default-avatar.png'} className={'h-10 w-10 rounded overflow-hidden ' + className} alt={alt} />
  )
}

export default Avatar
