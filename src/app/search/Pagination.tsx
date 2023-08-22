import Link from 'next/link'
import { FC } from 'react'

interface PropsType {
  query: string
  hasNextPage: boolean
  currentPage: number
  pages: number
}

const Pagination: FC<PropsType> = ({ query, hasNextPage, currentPage, pages }) => {
  return (
    <div className="mb-6 flex gap-3 md:gap-3 justify-center w-full items-center">
      {new Array(pages).fill(null).map((item, index) => (
        <Link key={index} href={`/search?query=${query}&page=${index + 1}`}>
          <div
            className={`h-10 w-10 rounded text-center flex items-center justify-center ${
              index + 1 === currentPage ? 'bg-red' : 'bg-dark'
            }`}
          >
            <span className="text-base text-neutral-100">{index + 1}</span>
          </div>
        </Link>
      ))}
    </div>
  )

  return (
    <div className="mb-6 flex gap-3 md:gap-3 justify-center w-full items-center">
      {currentPage > 1 && (
        <Link href={`/search?query=${query}&page=${Number(currentPage) - 1}`}>
          <div className="h-10 w-10 rounded text-center flex items-center justify-center bg-dark">
            <span className="text-base text-neutral-100">{currentPage - 1}</span>
          </div>
        </Link>
      )}
      <div className="h-10 w-10 rounded bg-red text-center flex items-center justify-center">
        <span className="text-base text-neutral-100">{currentPage}</span>
      </div>
      {hasNextPage && (
        <Link href={`/search?query=${query}&page=${Number(currentPage) + 1}`}>
          <div className="h-10 w-10 rounded text-center flex items-center justify-center bg-dark">
            <span className="text-base text-neutral-100">{currentPage + 1}</span>
          </div>
        </Link>
      )}
    </div>
  )
}

export default Pagination
