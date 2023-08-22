import * as types from '@/types'
import next, { GetServerSidePropsContext } from 'next'
import { FC } from 'react'
import SearchBar from '@/components/Header/SearchBar'
import AnimeCard from '@/components/AnimeCard'
import Genres from './Genres'
import Pagination from './Pagination'
import Head from 'next/head'
import AnimeService from '@/services/AnimeService'
import Layout from '@/components/Layout'
import serialize from '@/utils/serialize'
import Card from '@/components/Anime/Card'
import HorizontalCard from '@/components/Anime/HorizontalCard'
import CardsColumn from '@/components/Anime/CardsColumn'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export interface SearchResponse {
  results: types.Anime[]
  hasNextPage: boolean
  currentPage: number
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const query = context.query.query ? String(context.query.query) : undefined
  const page = context.query.page ? Number(context.query.page) : 1

  if (!query || isNaN(page)) {
    return { notFound: true, props: {} }
  }

  const resultsPromise = AnimeService.search(query, page < 1 ? 0 : page - 1)
  const nextPagePromise = AnimeService.search(query, page < 1 ? 1 : page)

  const [results, nextPage] = await Promise.all([resultsPromise, nextPagePromise])

  return {
    props: {
      results: serialize(results),
      query: query,
      currentPage: page,
      hasNextPage: !!nextPage.length,
    },
  }
}

const Search: FC<types.PageProps<{}, { query: string; page: string }>> = async ({ searchParams }) => {
  const session = getServerSession(authOptions)

  const query = searchParams.query ? String(searchParams.query) : undefined
  const page = searchParams.page ? Number(searchParams.page) : 1

  if (!query || isNaN(page)) {
    return null
  }

  const resultsPromise = AnimeService.search(query, page < 1 ? 0 : page - 1)
  const nextPagePromise = AnimeService.search(query, page < 1 ? 1 : page)

  const popularPromise = AnimeService.getPopular(session?.user?.id)
  const topPromise = AnimeService.getTop(session?.user?.id)

  const [results, nextPage, popular, top] = await Promise.all([
    resultsPromise,
    nextPagePromise,
    popularPromise,
    topPromise,
  ])

  return (
    <>
      <Head>
        <title>{`Search: ${query}`}</title>
      </Head>
      <Layout>
        <main className="pb-4 px-2 py-3 md:pb-0 md:pt-header md:px-8 lg:px-14">
          <div className="flex flex-col justify-end h-fullw-full md:hidden mb-2">
            <SearchBar />
          </div>
          <div className="md:flex gap-8">
            {/*<div className="py-2 hidden">
            <p className="text-center text-white">Found {results.length} titles</p>
  </div>*/}
            {/*<div className="py-3 md:hidden">
            <Genres genres={genres.slice(0, 10)} />
  </div>*/}
            {results.data.length ? (
              <>
                <div>
                  <div className="hidden md:block mb-6">
                    <h2 className="mb-2 lg:mb-6 text-lg font-semibold md:text-2xl px-2 text-white">{`Results for ${query} (${results.count})`}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-3 auto-rows-auto flex-1 mb-6 lg:mb-0">
                      {results.data.map((item) => (
                        <Card key={item.id} {...item} />
                      ))}
                    </div>
                  </div>
                  <div className="md:hidden mb-6">
                    <CardsColumn data={results.data} title={`Results for ${query} (${results.count})`} />
                  </div>
                  <Pagination
                    pages={Math.ceil(results.count / 30)}
                    currentPage={page}
                    query={query}
                    hasNextPage={!!nextPage}
                  />
                </div>
                <div className="lg:flex-[0_0_350px]">
                  <CardsColumn data={popular.slice(0, 5)} title="Popular Anime" className=" mb-6" />
                  <CardsColumn data={top.slice(0, 5)} title="Top Anime" className="" />
                </div>
              </>
            ) : (
              <div className="py-24 md:py-64">
                <h1 className="text-white font-bold text-center text-3xl">Nothing was found for {query}</h1>
              </div>
            )}
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Search
