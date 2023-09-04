'use client'

import { Anime } from '@/types'
import { FC, useEffect, useRef, useState } from 'react'
import CarouselItem from './CarouselItem'

interface Props {
  data: Anime[]
}

const Carousel: FC<Props> = ({ data }) => {
  const interval = useRef<NodeJS.Timeout>()

  const items = data

  const [selected, setSelected] = useState<string>(items[0].id)

  const handleMouseEnter = (id: string) => {
    setSelected(id)
  }

  const handleMouseLeave = (id: string) => {}

  useEffect(() => {
    clearInterval(interval.current)

    interval.current = setInterval(() => {
      setSelected((prev) => {
        const prevIndex = items.findIndex((item) => item.id === prev)

        return items[prevIndex + 1]?.id || items[0].id
      })
    }, 10000)
  }, [selected])

  return (
    <div className="md:flex md:gap-2 h-[450px] md:h-auto">
      {items.map((item) => (
        <CarouselItem
          key={item.id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isSelected={selected === item.id}
          {...item}
        />
      ))}
    </div>
  )
}

export default Carousel
