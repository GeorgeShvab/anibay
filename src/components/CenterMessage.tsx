import { FC } from 'react'

interface Props {
  title: string
  subtitle: string
}

const CenterMessage: FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="container">
      <div className="mb-6 md:mb-8 py-28">
        <div className="px-4 flex flex-col items-center gap-3 md:gap-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide text-white">{title}</h1>
          <p className="text-neutral-300 text-center">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export default CenterMessage
