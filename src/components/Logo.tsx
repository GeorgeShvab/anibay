import Link from 'next/link'
import { FC } from 'react'

interface Props {
  href?: string
  className?: string
}

const Logo: FC<Props> = ({ className, href }) => {
  if (href) {
    return (
      <h2 className={`font-logo text-3xl md:text-3xl tracking-wide text-red ${className}`}>
        <Link href={href}>AniBay</Link>
      </h2>
    )
  }
  return <h2 className={`font-logo text-3xl md:text-3xl tracking-wide text-red ${className}`}>AniBay</h2>
}

export default Logo
