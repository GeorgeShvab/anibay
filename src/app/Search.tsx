'use client'

import useOutsideClick from '@/hooks/useOutsideClick'
import { Anime } from '@/types'
import removeEpisode from '@/utils/removeEpisode'
import throttle from '@/utils/throttle'
import axios from '@/axios'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, FocusEvent, FormEvent, useEffect, useRef, useState } from 'react'

interface PropsType {
  placeholder?: string
  className?: string
}

const Search: FC<PropsType> = ({ placeholder = 'Search anime...', className }) => {
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)

  const [hint, setHint] = useState<Anime[]>([])

  const [show, setShow] = useState<boolean>(false)

  const pathname = usePathname()

  const query = useSearchParams()?.get('query')

  useEffect(() => {
    setShow(false)
  }, [pathname])

  const handleSubmit = (e: FormEvent<HTMLFormElement> & { target: { query: HTMLInputElement } }) => {
    e.preventDefault()

    const query = e.target.query.value.trim()

    if (!query) return

    router.push('/search?query=' + query)
  }

  const handleInput = throttle(async (e: FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget?.value.trim()

    if (!query) {
      setHint([])
      return
    }

    setShow(true)

    const { data } = await axios.get<Anime[]>(`/api/autocomplete/search?query=${query}`)

    setHint(data.slice(0, 5))
  }, 250)

  useOutsideClick(containerRef, () => setShow(false))

  const handleFocus = async (e: FocusEvent<HTMLInputElement>) => {
    setShow(true)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setHint([])
    }
  }

  return (
    <div
      className={`bg-white p-2 w-[90vw] md:w-[32rem] rounded relative ${
        hint?.length && show ? 'rounded-b-none' : ''
      } ${className}`}
      ref={containerRef}
    >
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          name="query"
          className="h-8 flex-auto block border-none outline-none px-2"
          placeholder={placeholder}
          autoComplete="off"
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          defaultValue={query || ''}
        />
        <button type="submit" className="flex-initial px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
      {hint?.length && show ? (
        <div className="absolute top-full py-2 bg-white left-0 z-50 rounded-b border-t w-full">
          <ul>
            {hint?.map((item) => (
              <Link key={item.id} href={`/watch/${removeEpisode(item.id)}`}>
                <li className="py-1 px-4 hover:bg-gray-100">{item.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default Search
