'use client'

import * as types from '@/types'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'

interface PropsType {
  data: types.Genre[]
  className?: string
}

const getRandomNumber = (length: number) => Math.floor(Math.random() * length)

const Genres: FC<PropsType> = ({ data, className = '' }) => {
  const interval = useRef<NodeJS.Timeout>()

  const [selectedGenre, setSelectedGenre] = useState<string>()

  useEffect(() => {
    const newGenre = data[getRandomNumber(data.length)].id
    setSelectedGenre(newGenre)

    interval.current = setInterval(() => {
      const newGenre = data[getRandomNumber(data.length)].id
      setSelectedGenre(newGenre)
    }, 5000)

    return () => {
      clearInterval(interval.current)
    }
  }, [])

  return (
    <div className={`flex flex-wrap gap-2 w-full overflow-auto no-scrollbar bg-dark rounded-lg p-2`}>
      {data.map((item, index) => (
        <Link
          className={`px-4 py-1.5 rounded-lg text-white h-fit whitespace-nowrap text-sm hover:bg-red transition-colors ${
            item.id === selectedGenre ? 'bg-red' : 'bg-black'
          }`}
          href={`/search?genre=${item.id}`}
          key={item.id}
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default Genres
