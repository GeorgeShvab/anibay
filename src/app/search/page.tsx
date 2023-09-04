import * as types from '@/types'
import { FC } from 'react'
import Pagination from './Pagination'
import AnimeService from '@/services/AnimeService'
import Layout from '@/components/Layout'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import GenreService from '@/services/GenreService'
import SearchBar from './Search'
import { Metadata } from 'next'
import { Anime } from '@/types'
import Title from '@/components/Title'
import Genres from './Genres'
import CardGrid from '@/components/Anime/CardGrid'
import PosterGrid from '@/components/Anime/PosterGrid'
import Image from 'next/image'
import bg from '@/assets/big-image.png'

const Search: FC<types.PageProps<{}, { query: string; page: string; genre: string }>> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions)

  const query = searchParams.query ? String(searchParams.query) : undefined
  const page = searchParams.page ? Number(searchParams.page) : 1
  const genre = searchParams.genre

  const resultsPromise =
    query || genre
      ? AnimeService.search({ query, genre: genre === 'all' ? undefined : genre, page: page < 1 ? 0 : page - 1 })
      : null
  const nextPagePromise =
    query || genre
      ? AnimeService.search({ query, genre: genre === 'all' ? undefined : genre, page: page < 1 ? 1 : page })
      : null

  const popularPromise = AnimeService.getPopular(session?.user?.id, 10)
  const topPromise = AnimeService.getTop(session?.user?.id, 6)
  const genresPromise = GenreService.getAll()

  const [results, nextPage, popular, top, genres] = await Promise.all([
    resultsPromise,
    nextPagePromise,
    popularPromise,
    topPromise,
    genresPromise,
  ])

  return (
    <>
      <Layout>
        <main className="">
          <div className="h-[420px] md:h-[650px] w-full absolute z-[-1]">
            <Image
              src={bg}
              alt="Background"
              className="w-full h-full"
              quality={50}
              style={{
                objectFit: 'cover',
              }}
            />
            <div className="search-gradient w-full h-full absolute inset-0"></div>
          </div>
          <div className="search-poster h-[370px] md:h-[600px] flex flex-col items-center justify-center px-3">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-10">What are you looking for?</h1>
            <SearchBar />
          </div>
          <div className="">
            <div className="lg-container mb-6 md:mb-10">
              <Title className="px-6 mb-3 md:mb-6">Filter By Genres</Title>
              <Genres className="px-3 lg:px-0" page={page} genre={genre} query={query} data={genres} />
            </div>
            {!!results?.data.length && (
              <>
                <div className="lg-container">
                  <Title className="px-6 mb-3 md:mb-6">
                    {query
                      ? `Results for ${query} (${results.count})`
                      : genre.at(0)?.toUpperCase() + genre.slice(1, genre.length)}
                  </Title>
                  <CardGrid className="px-3 lg:px-0" data={results.data} />
                </div>

                <Pagination
                  pages={Math.ceil(results.count / 30)}
                  currentPage={page}
                  query={query}
                  genre={genre}
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
                      Nothing was found for {query}
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

export async function generateMetadata({
  searchParams,
}: types.PageProps<{}, { query: string; page: string }>): Promise<Metadata> {
  const posterAnimePromise = (await AnimeService.getOne({ id: 'clfrvc5mj00chkslucw4phc3j' })) as any as Anime

  return {
    title: `Search results for ${searchParams.query}`,
    description: `Search results for ${searchParams.query}`,
    openGraph: {
      images: [posterAnimePromise?.cover || posterAnimePromise.image],
      title: `Search results for ${searchParams.query}`,
      description: `Search results for ${searchParams.query}`,
      type: 'website',
      url: '/search/' + searchParams.query,
    },
  }
}
