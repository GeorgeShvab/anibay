import { FC } from 'react'

const BackgroundImage: FC<{ url: string }> = ({ url }) => {
  return (
    <>
      <div
        className="h-120 mb-6 md:hidden"
        style={{
          backgroundImage: `linear-gradient(
              #06060600 0%,
              #06060640 50%,
              #060606 100%
            ),
            url(${url})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <div
        className="mb-6 hidden filter blur md:block h-[600px] absolute z-[-1] top-0 w-full"
        style={{
          backgroundImage: `linear-gradient(#060606 0%, #06060680 50%, #060606 100%), url(${url})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    </>
  )
}

export default BackgroundImage
