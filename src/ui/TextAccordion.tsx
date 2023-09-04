'use client'

import { FC, MouseEvent, ReactElement, useRef, useState } from 'react'

const TextAccordion: FC<{
  children: ReactElement
  initialHeight?: string
  bgColor?: string
}> = ({ children, initialHeight = '50px', bgColor = '#121212' }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    setIsCollapsed((prev) => !prev)
  }

  const collapsedHeight = (containerRef.current?.scrollHeight || 0) + 30 + 'px'

  return (
    <div
      className="overflow-hidden relative transition-[height] ease-in duration-300"
      style={{
        height: isCollapsed ? collapsedHeight : initialHeight,
      }}
      onClick={() => !isCollapsed && setIsCollapsed(true)}
    >
      <div ref={containerRef}>{children}</div>
      <div
        className={`absolute w-full h-full top-0 left-0 transition-opacity ease-in duration-300 opacity-${
          isCollapsed ? '0' : '100'
        }`}
        style={{
          background: `linear-gradient(${bgColor}00, ${bgColor}bf, ${bgColor})`,
        }}
      />
      <button
        onClick={handleClick}
        className={`absolute bottom-0 w-full flex justify-center text-neutral-600 right-1/2 translate-x-2/4 p-1 rounded-full`}
        aria-label={isCollapsed ? 'Close' : 'Show'}
      >
        <div>
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </div>
      </button>
    </div>
  )
}

export default TextAccordion
