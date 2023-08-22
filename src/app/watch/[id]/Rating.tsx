import { FC } from 'react'

interface Props {
  id: string
  rating: number
}

const Rating: FC<Props> = ({ id, rating }) => {
  return (
    <div className={`flex items-center px-2.5 pr-1 w-full`}>
      {new Array(5).fill(null).map((item, index) => (
        <div className={index < rating ? 'text-red' : 'text-black'} key={index}>
          <div className="px-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>
        </div>
      ))}

      <div className="!text-white flex-1 text-center">{rating ? rating.toFixed(1) : '-'}</div>
    </div>
  )
}

export default Rating
