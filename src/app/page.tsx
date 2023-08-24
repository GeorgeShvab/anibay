import { Inter } from 'next/font/google'
import { FC } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import AnimeService from '@/services/AnimeService'
import Layout from '@/components/Layout'
import { authOptions } from './api/auth/[...nextauth]/route'
import HorizontalPoster from '@/components/Anime/HorizontalPoster'
import GenreService from '@/services/GenreService'
import Card from './Card'
import MainPoster from './MainPoster'
import Slider from 'react-slick'
import { Anime } from '@/types'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const Home: FC = async () => {
  const session = await getServerSession(authOptions)

  const posterAnimePromise = AnimeService.getOne('clfrvc5mj00chkslucw4phc3j')

  const popularPromise = AnimeService.getRandomPopular(session?.user.id, 10)
  const randomAnimePromise = AnimeService.getRandomTop(session?.user.id, 1)
  const genresPromise = GenreService.getAll()
  const topPropmise = AnimeService.getRandomTop(session?.user.id, 6)

  const [popular, randomAnime, genres, top, posterAnime] = await Promise.all([
    popularPromise,
    randomAnimePromise,
    genresPromise,
    topPropmise,
    posterAnimePromise,
  ])

  const anime = posterAnime as any as Anime

  return (
    <>
      <Layout blackFooter>
        <main className="">
          <MainPoster {...anime} />

          <div className="md:mt-[-100px] z-10 relative">
            <div className="">
              <div className="mb-6 md:mb-14 max-w-[1512px] m-auto lg:px-14">
                <h3 className="px-3 mb-3 md:px-2 md:mb-6 text-white md:text-xl lg:text-2xl font-semibold ">
                  Best Genres
                </h3>
                <div className="flex md:flex-wrap px-3 md:px-0 gap-2 w-full overflow-auto no-scrollbar">
                  {genres.map((item, index) => (
                    <Link
                      className={`px-4 py-1.5 rounded text-white h-fit whitespace-nowrap hover:bg-red-dark transition-colors ${
                        !index ? 'bg-dark' : 'bg-dark'
                      }`}
                      key={item.id}
                      href={`/genres/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="px-3 mb-6 md:mb-14 max-w-[1512px] m-auto lg:px-14">
                <h3 className="px-3 mb-3 md:px-2 md:mb-6 text-white md:text-xl lg:text-2xl font-semibold">
                  Popular Anime
                </h3>
                <div className="flex md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 items-stretch md:gap-4 overflow-auto md:overflow-visible no-scrollbar px-3 py-2 md:py-0 md:px-0">
                  {popular.map((item) => (
                    <Card key={item.id} {...item} />
                  ))}
                </div>
              </div>
              <div className="container">
                <h3 className="px-3 mb-3 md:px-2 md:mb-6 text-white md:text-xl lg:text-2xl font-semibold">Top Anime</h3>
                <div className="flex flex-col gap-4 flex-1 md:grid grid-cols-2">
                  {top.map((item) => (
                    <HorizontalPoster key={item.id} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Home

export const metadata: Metadata = {
  title: `Anibay`,
  description: 'Anibay - anime streaming platform',
  openGraph: {
    images: ['/auth-bg.png'],
    title: 'Anibay - anime streaming platform',
    description: 'Anibay - anime streaming platform',
    type: 'website',
    url: '/',
  },
}
