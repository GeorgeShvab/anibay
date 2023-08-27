'use client'

import axios from '@/axios'
import useOutsideClick from '@/hooks/useOutsideClick'
import { Anime } from '@/types'
import IconButton from '@/ui/IconButton'
import throttle from '@/utils/throttle'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useState, FormEvent, ChangeEvent, useCallback, useRef } from 'react'
import { useMutation } from 'react-query'

const Search: FC = () => {
  const router = useRouter()

  const query = useSearchParams()?.get('query')

  const containerEl = useRef<HTMLFormElement>(null)

  const searchParams = useSearchParams()

  const [value, setValue] = useState<string>(query || '')

  const [isAutocompleteShown, setIsAutocompleteShown] = useState<boolean>()

  const { mutateAsync, data } = useMutation(
    async (query: string) => (await axios.get<Anime[]>('/api/autocomplete/search?query=' + query)).data
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value.trim()) return

    const search = new URLSearchParams(searchParams?.toString())

    search.set('query', value.trim())

    router.push('/search?' + search.toString())
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

    setIsAutocompleteShown(true)
  }

  useOutsideClick(containerEl, () => setIsAutocompleteShown(false))

  return (
    <form
      className={`flex gap-3 p-0.5 md:p-1 bg-neutral-50 relative w-full md:w-fit ${
        isAutocompleteShown && data && data.length ? 'rounded-t' : 'rounded'
      }`}
      onSubmit={handleSubmit}
      ref={containerEl}
      onClick={() => setIsAutocompleteShown(true)}
    >
      <input
        type="text"
        className="md:w-[400px] lg:w-[450px] flex-1 md:flex-initial outline-none h-10 bg-neutral-50 rounded text-black px-3 block"
        placeholder="Naruto"
        onInput={handleInput}
        value={value}
      />
      <IconButton className="block h-10 w-10 flex-[0_0_40px]">
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
      </IconButton>
      {isAutocompleteShown && data && !!data.length && (
        <ul className="top-full left-0 w-full absolute bg-neutral-50 rounded-b overflow-hidden">
          {data.slice(0, 5).map((item) => (
            <li key={item.id} className="text-black px-4 py-2 text-sm hover:bg-neutral-200 transition-colors">
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
