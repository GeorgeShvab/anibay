'use client'

import { FC, ReactElement, useRef, useState } from 'react'

interface Props {
  text: string
}

interface State {
  height: number
  isCollapsed: boolean
}

const MobileDescription: FC<Props> = ({ text }) => {
  const container = useRef<HTMLDivElement>(null)

  const [state, setState] = useState<State>({ height: 50, isCollapsed: false })

  const handleClick = () => {
    if (!container.current) return

    if (container.current?.clientHeight === 50) {
      setState({ height: container.current.scrollHeight, isCollapsed: true })
    } else {
      setState({ height: 50, isCollapsed: false })
    }
  }

  return (
    <div className={'relative overflow-hidden rounded px-3 py-2 !pb-12'}>
      <button
        onClick={handleClick}
        className={`absolute bottom-0 h-full left-0 w-full text-gray-400 flex flex-col justify-end items-center py-4 ${
          state.isCollapsed ? '' : 'mobile-description-gradient'
        }`}
      >
        <span className="px-3 py-1 text-xs rounded-full bg-red text-white block">
          {state.isCollapsed ? 'Hide' : 'Show'}
        </span>
      </button>
      <p
        className="text-gray-400 text-justify"
        dangerouslySetInnerHTML={{ __html: text }}
        style={{ height: state.height + 'px' }}
        ref={container}
      ></p>
    </div>
  )
}

export default MobileDescription
