import { FC, ReactElement } from 'react'

interface Props {
  children: ReactElement | string
  className?: string
}

const Title: FC<Props> = ({ children, className = '' }) => {
  return <h3 className={`text-white md:text-xl lg:text-2xl font-semibold ${className}`}>{children}</h3>
}

export default Title
