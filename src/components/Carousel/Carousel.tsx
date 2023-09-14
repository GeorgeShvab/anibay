'use client'

import { Anime } from '@/types'
import { FC, TouchEvent, useEffect, useRef, useState } from 'react'
import CarouselItem from './CarouselItem'

interface Props {
  data: Anime[]
}

interface CarouselState {
  selected: string
  direction: 'left-right' | 'right-left'
}

interface TouchData {
  startX?: number
  startY?: number
  endX?: number
  endY?: number
}

const Carousel: FC<Props> = ({ data }) => {
  const interval = useRef<NodeJS.Timeout>()

  const touchData = useRef<TouchData>({})

  const items = data

  const [selected, setSelected] = useState<CarouselState>({ selected: items[0].id, direction: 'left-right' })

  const handleMouseEnter = (id: string) => {
    setSelected((prev) => ({ ...prev, selected: id }))
  }

  const handleMouseLeave = (id: string) => {}

  useEffect(() => {
    clearInterval(interval.current)

    interval.current = setInterval(() => {
      setSelected((prev) => {
        const prevIndex = items.findIndex((item) => item.id === prev.selected)

        if (prev.direction === 'left-right') {
          if (items[prevIndex + 1]) {
            return { ...prev, selected: items[prevIndex + 1]?.id }
          } else {
            return {
              selected: items[prevIndex - 1]?.id,
              direction: 'right-left',
            }
          }
        } else {
          if (items[prevIndex - 1]) {
            return { ...prev, selected: items[prevIndex - 1]?.id }
          } else {
            return {
              selected: items[prevIndex + 1]?.id,
              direction: 'left-right',
            }
          }
        }
      })
    }, 10000)
  }, [selected])

  const handleTouchStart = (e: TouchEvent) => {
    touchData.current.startX = e.changedTouches[0].clientX
    touchData.current.startY = e.changedTouches[0].clientY
  }

  const handleTouchEnd = (e: TouchEvent) => {
    touchData.current.endX = e.changedTouches[0].clientX
    touchData.current.endY = e.changedTouches[0].clientY

    if (touchData.current.startY && Math.abs(touchData.current.startY - touchData.current.endY) > 80) return

    if (touchData.current.startX && touchData.current.endX - touchData.current.startX > 80) {
      setSelected((prev) => {
        const prevIndex = items.findIndex((item) => item.id === prev.selected)

        if (items[prevIndex - 1]) {
          return { selected: items[prevIndex - 1]?.id, direction: prev.direction }
        }

        return prev
      })
    } else if (touchData.current.startX && touchData.current.startX - touchData.current.endX > 80) {
      setSelected((prev) => {
        const prevIndex = items.findIndex((item) => item.id === prev.selected)

        if (items[prevIndex + 1]) {
          return { selected: items[prevIndex + 1]?.id, direction: prev.direction }
        }

        return prev
      })
    }

    touchData.current = {}
  }

  return (
    <div className="flex md:gap-2 h-[500px] md:h-auto" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {items.map((item) => (
        <CarouselItem
          key={item.id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isSelected={selected.selected === item.id}
          {...item}
        />
      ))}
    </div>
  )
}

export default Carousel
