import Link from 'next/link'
import { FC } from 'react'

interface PropsType {
  query: string
  hasNextPage: boolean
  currentPage: number
  pages: number
}

const Pagination: FC<PropsType> = ({ query, hasNextPage, currentPage, pages }) => {
  console.log(Math.max(currentPage - 2, 0), Math.min(currentPage + 3, pages), pages, currentPage)

  const initialPagesArray = Array.from({ length: pages }, (_, index) => index + 1)

  let firstPageHint = true // First page displays if current pages to display in pagination don't icnlude first page: 1 ... 12 13 14 15 16 ... 30
  let lastPageHint = true // Same as first page hint but for last page

  let pagesArray = initialPagesArray

  if (pages > 5) {
    pagesArray = initialPagesArray.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pages))
  }

  if (currentPage > pages - 3) {
    pagesArray = initialPagesArray.slice(pages - 5, pages)
    lastPageHint = false
  }

  if (currentPage < 4) {
    pagesArray = initialPagesArray.slice(0, 5)
    firstPageHint = false
  }

  return (
    <div className="flex gap-2 py-8 md:py-16 md:gap-4 justify-center w-full items-center">
      <div className="flex gap-1 md:gap-2 justify-center items-center">
        <Link
          href={`/search?query=${query}&page=${currentPage - 1}`}
          className={currentPage === 1 ? 'pointer-events-none' : 'text-neutral-100'}
        >
          <div
            className={`h-10 w-10 rounded text-center flex items-center justify-center bg-dark md:hover:bg-red-dark transition-colors`}
          >
            <span className={`text-base ${currentPage === 1 ? 'text-neutral-600' : 'text-neutral-100'}`}>
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
            </span>
          </div>
        </Link>
        {firstPageHint && (
          <>
            <Link href={`/search?query=${query}&page=1`} className="hidden md:flex">
              <div
                className={`h-10 w-10 rounded text-center flex items-center justify-center bg-dark md:hover:bg-red-dark transition-colors`}
              >
                <span className="text-base text-neutral-100">1</span>
              </div>
            </Link>
            {!pagesArray.includes(2) && (
              <div
                className={`h-10 w-10 rounded text-center flex items-center justify-center bg-dark md:hover:bg-red-dark transition-colors hidden md:flex`}
              >
                <span className="text-base text-neutral-100">...</span>
              </div>
            )}
          </>
        )}
        {pagesArray.map((item, index) => (
          <Link key={index} href={`/search?query=${query}&page=${item}`}>
            <div
              className={`h-10 w-10 rounded text-center flex items-center justify-center ${
                item === currentPage ? 'bg-red' : 'bg-dark md:hover:bg-red-dark transition-colors'
              }`}
            >
              <span className="text-base text-neutral-100">{item}</span>
            </div>
          </Link>
        ))}
        {lastPageHint && (
          <>
            {!pagesArray.includes(pages - 1) && (
              <div
                className={`h-10 w-10 rounded text-center flex items-center justify-center bg-dark md:hover:bg-red-dark transition-colors hidden md:flex`}
              >
                <span className="text-base text-neutral-100">...</span>
              </div>
            )}
            <Link href={`/search?query=${query}&page=${pages}`} className="hidden md:flex">
              <div
                className={`h-10 w-10 rounded text-center flex items-center justify-center bg-dark md:hover:bg-red-dark transition-colors`}
              >
                <span className="text-base text-neutral-100">{pages}</span>
              </div>
            </Link>
          </>
        )}
        <Link
          href={`/search?query=${query}&page=${currentPage + 1}`}
          className={!hasNextPage ? 'pointer-events-none' : ''}
        >
          <div
            className={`h-10 w-10 rounded text-center flex items-center justify-center bg-dark md:hover:bg-red-dark transition-colors`}
          >
            <span className={`text-base ${!hasNextPage ? 'text-neutral-600' : 'text-neutral-100'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Pagination
