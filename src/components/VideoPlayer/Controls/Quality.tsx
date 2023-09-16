import { Source } from '@/types'
import { FC } from 'react'

interface PropsType {
  handleChangeQuality: (arg: string) => void
  sources: Source[]
  choosedQuality: string
}

const Quality: FC<PropsType> = ({ handleChangeQuality, sources, choosedQuality }) => {
  let shownSources

  if (sources.length > 1) {
    shownSources = sources.filter((item) => {
      const q = item.quality.replace('p', '')

      if (isNaN(Number(q))) return false

      return true
    })
  } else {
    shownSources = sources
  }

  return (
    <div className="overflow-hidden bottom-14 rounded flex flex-col gap-2">
      <div className="flex gap-3 items-center px-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
          />
        </svg>
        <ul className="flex justify-between max-w-[230px]">
          {shownSources
            .reduce<Source[]>(
              (state, curr) =>
                state.findIndex((item) => item.quality === curr.quality) === -1 ? [...state, curr] : state,
              []
            )
            .map((item) => (
              <li
                key={item.quality}
                onClick={() => handleChangeQuality(item.quality)}
                className={`py-1 ${
                  item.quality === choosedQuality ? 'text-red font-semibold' : 'text-neutral-300'
                } text-right cursor-pointer px-2`}
              >
                <span>{item.quality}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Quality
