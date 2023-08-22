import { FC } from 'react'

interface PropsType {
  alt: string
  url: string
}

const Poster: FC<PropsType> = ({ alt, url }) => {
  return (
    <div className="rounded bg-dark shadow-popup h-fit w-full p-4">
      <img src={url} alt={alt} className="w-full" />
    </div>
  )
}

export default Poster
