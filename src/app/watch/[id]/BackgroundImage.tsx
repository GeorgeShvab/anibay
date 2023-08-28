import { FC } from 'react'

const BackgroundImage: FC<{ url: string }> = ({ url }) => {
  return (
    <>
      <div
        className="h-120 mb-6 md:filter md:blur md:block md:h-[600px] md:absolute md:z-[-1] md:top-0 md:w-full anime-poster"
        style={{
          '--poster': `url(${url})`,
        }}
      />
    </>
  )
}

export default BackgroundImage
