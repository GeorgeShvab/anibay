import * as types from '@/types'
import { FC } from 'react'
import Pagination from './Pagination'
import Head from 'next/head'
import AnimeService from '@/services/AnimeService'
import Layout from '@/components/Layout'
import Card from '../Card'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import HorizontalPoster from '@/components/Anime/HorizontalPoster'
import ImageCard from './Card'
import GenreService from '@/services/GenreService'
import SearchBar from './Search'
import { data } from 'autoprefixer'
import { Metadata } from 'next'
import { Anime } from '@/types'

const Search: FC<types.PageProps<{}, { query: string; page: string }>> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions)

  const query = searchParams.query ? String(searchParams.query) : undefined
  const page = searchParams.page ? Number(searchParams.page) : 1

  const posterAnimePromise = AnimeService.getOne('clfrvc5mj00chkslucw4phc3j')
  const resultsPromise = query ? AnimeService.search(query, page < 1 ? 0 : page - 1) : null
  const nextPagePromise = query ? AnimeService.search(query, page < 1 ? 1 : page) : null

  const popularPromise = AnimeService.getPopular(session?.user?.id, 6)
  const topPromise = AnimeService.getTop(session?.user?.id, 6)
  const genresPromise = GenreService.getAll()

  const [results, nextPage, popular, top, posterAnime, genres] = await Promise.all([
    resultsPromise,
    nextPagePromise,
    popularPromise,
    topPromise,
    posterAnimePromise,
    genresPromise,
  ])

  const anime = posterAnime as any as types.Anime

  return (
    <>
      <Layout blackFooter>
        <main className="">
          <div
            className="search-poster h-[420px] md:h-[600px] flex flex-col items-center justify-start p-4 md:px-8 lg:py-10 z-0 lg:px-20 mb-6 lg:mb-0 relative !pt-48"
            style={{
              '--main-poster-image': `url(${anime.image})`,
              '--main-poster-cover': `url(${anime.cover})`,
            }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-10">What are you looking for?</h1>
            <SearchBar />
          </div>
          <div className="md:mt-[-100px] z-10 relative">
            <div className="md:px-3 mb-8 md:mb-14 max-w-[1512px] m-auto lg:px-14">
              <h3 className="px-6 mb-3 md:px-2 md:mb-6 text-white md:text-xl lg:text-2xl font-semibold ">
                Filter By Genres
              </h3>
              <div className="flex md:flex-wrap px-3 md:px-0 gap-2 w-full overflow-auto no-scrollbar">
                <span
                  className={`px-4 py-1.5 rounded text-white h-fit whitespace-nowrap hover:bg-red-dark transition-colors bg-red`}
                >
                  All
                </span>
                {genres.map((item, index) => (
                  <span
                    className={`px-4 py-1.5 rounded text-white h-fit whitespace-nowrap hover:bg-red-dark transition-colors ${
                      !index ? 'bg-dark' : 'bg-dark'
                    }`}
                    key={item.id}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
            <div className="gap-8 max-w-[1512px] m-auto lg:px-14">
              {!!results?.data.length && query && (
                <div>
                  <div className="px-3 md:px-0">
                    <h2 className="px-3 mb-3 md:px-2 md:mb-6 text-white md:text-xl lg:text-2xl font-semibold">{`Results for ${query} (${results.count})`}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 auto-rows-auto flex-1 lg:mb-0">
                      {results.data.map((item) => (
                        <ImageCard key={item.id} {...item} />
                      ))}
                    </div>
                  </div>

                  <Pagination
                    pages={Math.ceil(results.count / 30)}
                    currentPage={page}
                    query={query}
                    hasNextPage={!!nextPage?.data.length}
                  />
                </div>
              )}
              {results?.count === 0 && (
                <div className="px-3 md:px-0 mb-8 md:mb-0 md:py-16">
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
              )}
              <div className="lg:flex-[0_0_365px]">
                <div className="mb-8">
                  <h3 className="px-6 mb-3 md:px-2 md:mb-6 text-white md:text-xl lg:text-2xl font-semibold">
                    Popular Anime
                  </h3>
                  <div className="md:hidden flex md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 items-stretch md:gap-4 overflow-auto md:overflow-visible no-scrollbar px-3 py-2 md:py-0 md:px-0">
                    {popular.map((item) => (
                      <Card key={item.id} {...item} />
                    ))}
                  </div>
                  <div className="hidden md:flex flex flex-col gap-4 flex-1 md:grid grid-cols-2">
                    {popular.map((item) => (
                      <HorizontalPoster key={item.id} {...item} />
                    ))}
                  </div>
                </div>

                <div className="px-3 md:px-0">
                  <h3 className="px-3 mb-3 md:px-2 md:mb-6 text-white md:text-xl lg:text-2xl font-semibold">
                    Top Anime
                  </h3>
                  <div className="flex flex-col gap-4 flex-1 md:grid grid-cols-2 py-2 md:py-0">
                    {top.map((item) => (
                      <HorizontalPoster key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              </div>
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
  const posterAnimePromise = (await AnimeService.getOne('clfrvc5mj00chkslucw4phc3j')) as any as Anime

  return {
    title: `Search results for ${searchParams.query}`,
    description: `Search results for ${searchParams.query}`,
    openGraph: {
      images: [posterAnimePromise.cover],
      title: `Search results for ${searchParams.query}`,
      description: `Search results for ${searchParams.query}`,
      type: 'website',
      url: '/search/' + searchParams.query,
    },
  }
}
