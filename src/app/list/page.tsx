import * as types from '@/types'
import { FC } from 'react'
import Pagination from './Pagination'
import AnimeService from '@/services/AnimeService'
import Layout from '@/components/Layout'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import GenreService from '@/services/GenreService'
import { Metadata } from 'next'
import { Anime } from '@/types'
import Title from '@/components/Title'
import CardGrid from '@/components/Anime/CardGrid'
import PosterGrid from '@/components/Anime/PosterGrid'
import Genres from '@/components/Genre/Genres'
import BackButton from '@/components/Mobile/BackButton'

const Search: FC<types.PageProps<{}, { query: string; page: string; genre: string }>> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions)

  const page = searchParams.page ? Number(searchParams.page) : 1

  const posterAnimePromise = AnimeService.getOne({ id: 'clfrvc5mj00chkslucw4phc3j' })
  const bookmarkedAnimePromise = session?.user
    ? AnimeService.getBookmarkedAnime({ user: session?.user.id, page: page < 1 ? 0 : page - 1 })
    : null
  const hasNextPagePromise = session?.user
    ? AnimeService.getBookmarkedAnime({ user: session?.user.id, page: page < 1 ? 1 : page })
    : null

  const popularPromise = AnimeService.getPopular(session?.user?.id, 10)
  const topPromise = AnimeService.getTop(session?.user?.id, 6)

  const [posterAnime, results, nextPage, popular, top] = await Promise.all([
    posterAnimePromise,
    bookmarkedAnimePromise,
    hasNextPagePromise,
    popularPromise,
    topPromise,
  ])

  const anime = posterAnime as any as types.Anime

  if (!results) return null

  return (
    <>
      <Layout>
        <main className="">
          <div className="absolute flex gap-8 justify-between items-center w-full md:hidden absolute left-0 top-0 z-10 p-3">
            <BackButton className="" />
            <Title className="whitespace-nowrap px-3">
              <>Your List ({results.count} anime)</>
            </Title>
          </div>

          <div
            className="list-poster pt-header pb-header relative hidden md:block"
            style={{
              '--main-poster-image': `url(${anime.image})`,
              '--main-poster-cover': `url(${anime.cover})`,
            }}
          >
            <div className="container">
              <div className="flex items-center gap-32 mb-8">
                <Title className="whitespace-nowrap px-3">
                  <>Your List ({results.count} anime)</>
                </Title>
              </div>
            </div>
          </div>
          <div className="md:mt-[-100px] md:z-10 md:relative pt-[64px] md:pt-0">
            {!!results?.data.length && (
              <>
                <div className="lg-container">
                  <CardGrid className="px-3 lg:px-0" data={results.data} />
                </div>

                <Pagination
                  pages={Math.ceil(results.count / 30)}
                  currentPage={page}
                  hasNextPage={!!nextPage?.data.length}
                />
              </>
            )}
            {results?.count === 0 && (
              <div className="container">
                <div className="mb-8 md:py-12">
                  <div className="py-8 md:py-12 rounded-lg px-4 md:px-24 bg-dark flex flex-col items-center gap-8">
                    <span className="text-neutral-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-16 h-16"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </span>
                    <h1 className="text-neutral-200 font-semibold text-center text-lg">
                      There are no anime in your List
                    </h1>
                  </div>
                </div>
              </div>
            )}
            <div className="lg-container mb-6 md:mb-8 md:hidden">
              <Title className="px-6 mb-3 md:mb-6">Popular Anime</Title>
              <CardGrid className="px-3 lg:px-0" data={popular} mobileSlider />
            </div>

            <div className="lg-container">
              <Title className="px-6 mb-3 md:mb-6">Top Anime</Title>
              <PosterGrid className="px-3 lg:px-0" data={top} />
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Search

export const metadata: Metadata = {
  title: `Your List`,
  description: `Anime saved to watch later in your list`,
  openGraph: {
    images: ['/auth-bg.png'],
    title: 'Your List',
    description: 'Anime saved to watch later in your list',
    type: 'website',
    url: '/list',
  },
}
