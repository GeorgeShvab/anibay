'use client'

import axios from '@/axios'
import useOutsideClick from '@/hooks/useOutsideClick'
import { Anime } from '@/types'
import throttle from '@/utils/throttle'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, FC, FormEvent, useCallback, useRef, useState } from 'react'
import { useMutation } from 'react-query'

const Search: FC = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const [value, setValue] = useState<string>('')

  const [isOpened, setIsOpened] = useState<boolean>(false)

  const { mutateAsync, data } = useMutation(
    async (query: string) => (await axios.get<Anime[]>('/api/autocomplete/search?query=' + query)).data
  )

  const containerEl = useRef<HTMLFormElement>(null)

  const handleClick = () => {
    setIsOpened(true)
  }

  const queryAutocomplete = useCallback(
    throttle(async (value: string) => {
      await mutateAsync(value)
    }, 250),
    []
  )

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setValue(value)

    if (!value.trim()) return

    queryAutocomplete(value.trim())
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement> & { target: { query: HTMLInputElement } }) => {
    e.preventDefault()

    if (value) {
      const search = new URLSearchParams(searchParams?.toString())

      search.set('query', value.trim())

      router.push('/search?' + search.toString())
    }
  }

  useOutsideClick(containerEl, () => setIsOpened(false))

  return (
    <form
      className={`flex gap-3 pl-4 relative ${
        isOpened ? `bg-dark-light ${data && data.length ? 'rounded-t-[20px]' : 'rounded-full'}` : ''
      }`}
      onSubmit={handleSubmit}
      ref={containerEl}
    >
      {isOpened && (
        <div>
          <input
            onInput={handleInput}
            type="text"
            name="query"
            className="h-10 w-64 bg-transparent outline-none text-white text-sm"
            autoComplete="off"
            value={value}
            autoFocus
          />
        </div>
      )}
      <button className="text-white h-10 w-10" type="button" onClick={handleClick}>
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
      {data && data.length && isOpened && (
        <ul className="top-full left-0 w-full absolute bg-dark-light rounded-b-[20px] py-3 overflow-hidden">
          {data.slice(0, 5).map((item) => (
            <li key={item.id} className="text-white px-4 py-2 text-sm hover:bg-dark transition-colors">
              <Link className="block" href={`/watch/${item.id}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default Search
