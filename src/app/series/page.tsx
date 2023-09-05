import { PageProps } from '@/types'
import { getServerSession } from 'next-auth'
import { FC } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AnimeService from '@/services/AnimeService'
import Layout from '@/components/Layout'
import Link from 'next/link'
import BackButton from '@/components/Mobile/BackButton'
import PosterGrid from '@/components/Anime/PosterGrid'
import Pagination from '@/components/Pagination'
import Title from '@/components/Title'
import CardGrid from '@/components/Anime/CardGrid'
import SortButton from '@/components/SortButton'
import { Metadata } from 'next'
import generateParamsString from '@/utils/generateParamsString'

const Movies: FC<PageProps<{ page?: string; order_by?: string }>> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions)

  const page = searchParams.page ? Number(searchParams.page) : 1

  const moviesPromise = AnimeService.getSeries({
    page: page < 1 ? 0 : page - 1,
    orderBy: searchParams.order_by === 'rating' ? 'rating' : 'popularity',
  })
  const hasNextPagePromise = AnimeService.getSeries({
    page: page < 1 ? 1 : page,
    orderBy: searchParams.order_by === 'rating' ? 'rating' : 'popularity',
  })

  const popularPromise = AnimeService.getPopular(session?.user?.id, 6)

  const [results, nextPage, popular] = await Promise.all([moviesPromise, hasNextPagePromise, popularPromise])

  if (!results) return null

  return (
    <Layout>
      <main className="md:pt-header">
        <div className="container flex gap-8 py-4 px-6 md:py-0 md:!mb-8 items-center justify-between md:justify-start relative">
          <Link
            href="/"
            className="text-neutral-400 flex items-center gap-3 hover:text-neutral-100 transition-colors rounded-full hidden md:flex pl-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="text-xs hidden md:block">Back</span>
          </Link>
          <BackButton className="md:hidden" />
          <h1 className="text-lg md:text-xl font-bold text-white pr-3 md:pr-0 tracking-wide absolute md:static top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] md:translate-x-0 md:translate-y-0">
            Series
          </h1>
          <SortButton />
        </div>
        <div className="z-10 relative ">
          <div className="lg-container">
            <CardGrid className="px-3 lg:px-0" data={results.data} />
          </div>
          <Pagination
            pages={Math.ceil(results.count / 30)}
            currentPage={page}
            hasNextPage={!!nextPage?.data.length}
            params={generateParamsString(searchParams)}
          />
          <div className="lg-container">
            <Title className="px-6 mb-3 md:mb-6">Popular Anime</Title>
            <PosterGrid className="px-3 lg:px-0" data={popular} />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Movies

export const metadata: Metadata = {
  title: `Series`,
  description: `Thousands of subbed anime series in a good quality. Completely free.`,
  openGraph: {
    images: ['/auth-bg.png'],
    title: 'Series',
    description: 'Thousands of subbed anime series in a good quality. Completely free.',
    type: 'website',
    url: '/series',
  },
}
