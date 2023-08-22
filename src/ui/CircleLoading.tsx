import { FC } from 'react'

const CircleLoading: FC<{ white?: boolean; className?: string }> = ({ className = 'text-white' }) => {
  return (
    <svg
      className={`spinner ${className}`}
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="path"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        cx="10"
        cy="10"
        r="9"
      ></circle>
    </svg>
  )
}

export default CircleLoading
