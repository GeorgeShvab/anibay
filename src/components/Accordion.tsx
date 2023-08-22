'use client'

import { FC, ReactElement, useRef } from 'react'

interface Props {
  children: ReactElement
  button: ReactElement
  className?: string
  closedHeight: number
}

const Accordion: FC<Props> = ({ children, button, className, closedHeight }) => {
  const container = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (!container.current) return

    if (container.current?.clientHeight === closedHeight) {
      container.current.style.height = container.current.scrollHeight + 'px'
    } else {
      container.current.style.height = closedHeight + 'px'
    }
  }

  return (
    <div ref={container} className={className} style={{ height: closedHeight }}>
      <div onClick={handleClick}>{button}</div>
      {children}
    </div>
  )
}

export default Accordion
