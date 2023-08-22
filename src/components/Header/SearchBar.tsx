'use client'

import useOutsideClick from '@/hooks/useOutsideClick'
import { Anime } from '@/types'
import removeEpisode from '@/utils/removeEpisode'
import throttle from '@/utils/throttle'
import axios from '@/axios'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, FormEvent, useRef, useState, FocusEvent, useEffect } from 'react'

const SearchBar: FC<{ className?: string }> = ({ className }) => {
  const router = useRouter()

  const pathname = usePathname()

  const query = useSearchParams()?.get('query')

  const containerRef = useRef<HTMLDivElement>(null)

  const [hint, setHint] = useState<Anime[]>([])

  const [showHint, setShowHint] = useState<boolean>(false)

  useEffect(() => {
    setShowHint(false)
  }, [pathname])

  const handleSubmit = (e: FormEvent<HTMLFormElement> & { target: { query: HTMLInputElement } }) => {
    e.preventDefault()

    const query = e.target.query.value.trim()

    if (!query) return

    router.push('/search?query=' + query)

    setShowHint(false)
  }

  const handleInput = throttle(async (e: FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget?.value.trim()

    if (!query) {
      setHint([])
      return
    }

    const { data } = await axios.get<Anime[]>(`http://192.168.31.166:3000/api/autocomplete/search?query=${query}`)

    setHint(data.slice(0, 5))
  }, 250)

  useOutsideClick(containerRef, () => setShowHint(false))

  const handleFocus = async (e: FocusEvent<HTMLInputElement>) => {
    setShowHint(true)

    const query = e.currentTarget?.value.trim()

    if (!query) {
      return
    }

    if (query && !hint.length) {
      const { data } = await axios.get<Anime[]>(`http://192.168.31.166:3000/api/autocomplete/search?query=${query}`)

      setHint(data.slice(0, 5))
    }
  }

  return (
    <div
      className={`p-0.5 max-w-xl rounded relative bg-neutral-800 flex shadow-2xl gap-1 transition-colors ${className} ${
        hint?.length && showHint ? 'rounded-b-none' : ''
      }`}
      ref={containerRef}
    >
      <form onSubmit={handleSubmit} className={`flex items-center flex-1`}>
        <input
          type="text"
          name="query"
          className="placeholder:text-neutral-500 text-neutral-200 text-base caret-current h-6 flex-auto block border-none outline-none px-2 text-lg bg-transparent w-full"
          placeholder="Search anime..."
          autoComplete="off"
          onInput={handleInput}
          onFocus={handleFocus}
          defaultValue={query || ''}
        />
      </form>
      <button type="submit" className="flex-initial px-2 text-white p-1.5">
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
      {hint?.length && showHint ? (
        <div className="absolute shadow-2xl z-10 top-full py-2 bg-neutral-800 shadow-xl left-0 rounded-b w-full">
          <ul>
            {hint?.map((item) => (
              <li key={item.id} className="hover:text-neutral-200 hover:bg-dark-light text-neutral-100">
                <Link key={item.id} href={`/watch/${item.id}`} className="py-1.5 px-3 block">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
