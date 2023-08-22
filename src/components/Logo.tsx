import { FC } from 'react'

const Logo: FC<{ className?: string }> = ({ className }) => {
  return <h2 className={`font-logo text-3xl md:text-3xl tracking-wide text-red ${className}`}>AniBay</h2>
}

export default Logo
