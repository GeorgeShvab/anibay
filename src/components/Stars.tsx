import { FC } from 'react'

interface Props {
  className?: string
  rating: number
  iconContainerClassName?: string
}

const Stars: FC<Props> = ({ className = '', iconContainerClassName = '', rating }) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {new Array(5).fill(null).map((item, index) => (
        <span className={`${index >= rating / 20 ? 'text-dark' : 'text-red'} ${iconContainerClassName}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 md:w-6 h-5 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </span>
      ))}
    </div>
  )
}

export default Stars
