import { AnimeType, Episode } from '@/types'
import { FC, memo } from 'react'

interface PropsType {
  fullscreen: boolean
  title: string
  episode: Episode
  type: AnimeType
}

const Title: FC<PropsType> = ({ fullscreen, title, episode, type }) => {
  const handleCloseFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  return (
    <div
      className="absolute top-0 left-0 flex p-1 pl-2 sm:p-2 lg:p-4 items-center gap-3 z-20"
      style={{ maxWidth: '90%' }}
    >
      {fullscreen && (
        <button
          type="button"
          className="text-white hover:bg-gray-200/25 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 lg:p-2 text-center inline-flex items-center"
          onClick={handleCloseFullScreen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="sr-only">Back</span>
        </button>
      )}
      <h2 className="lg:text-xl text-white text-sm h-[20px] lg:h-[28px]">
        {episode && type !== 'MOVIE' ? (
          <>
            {title} &nbsp; &bull; &nbsp; Episode {episode.number} &nbsp; &bull; &nbsp; {episode.title}
          </>
        ) : (
          title
        )}
      </h2>
    </div>
  )
}

export default memo(Title)
