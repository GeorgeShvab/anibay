import { FC } from 'react'
import { getServerSession } from 'next-auth'
import AnimeService from '@/services/AnimeService'
import Layout from '@/components/Layout'
import { authOptions } from './api/auth/[...nextauth]/route'
import GenreService from '@/services/GenreService'
import MainPoster from './MainPoster'
import { Metadata } from 'next'
import CardGrid from '@/components/Anime/CardGrid'
import PosterGrid from '@/components/Anime/PosterGrid'
import Title from '@/components/Title'
import Genres from './Genres'
import Carousel from '@/components/Carousel/Carousel'
import EpisodeService from '@/services/EpisodeService'
import Episode from '@/components/Episode/Episode'
import GenresRow from '@/components/Genre/Genres'
import Link from 'next/link'

const Home: FC = async () => {
  const session = await getServerSession(authOptions)

  const latestEpisodesPromise = EpisodeService.getLatestEpisodes(3)

  const popularPromise = AnimeService.getRandomPopular(session?.user.id, 10)
  const genresPromise = GenreService.getAll()
  const randomPromise = AnimeService.getRandomTop(session?.user.id, 6)
  const popularMoviesPromise = AnimeService.getMovies({ orderBy: 'popularity', amount: 4 })
  const popularSeriesPromise = AnimeService.getSeries({ orderBy: 'popularity', amount: 5 })

  const [popular, genres, random, latestEpisodes, popularMovies, series] = await Promise.all([
    popularPromise,
    genresPromise,
    randomPromise,
    latestEpisodesPromise,
    popularMoviesPromise,
    popularSeriesPromise,
  ])

  return (
    <Layout>
      <main className="">
        <div className="md:pt-[calc(var(--header-height)+20px)] md:px-3 lg:px-14 lg-container mb-5 md:mb-8">
          <Carousel data={random} />
        </div>
        <div className="hidden">
          <MainPoster {...random[0]} />
        </div>
        <div className="container !mb-5 md:mb-8 hidden md:block">
          <p className="bg-dark text-gray-300 rounded-lg p-4 leading-7">
            <span className="text-red font-bold">AniBay</span> is your top spot for free online anime streaming, with a
            wide range of high-quality subtitled anime titles to enjoy. We make sure to keep you up-to-date with daily
            episode releases, so you never miss the latest developments in your favorite series. Dive into the world of
            anime magic right at your fingertips with <span className="text-red font-bold">AniBay</span> and start your
            anime journey today!
          </p>
        </div>
        <div className="z-10 relative">
          <div className="lg-container mb-5 md:mb-8 block md:flex gap-8">
            <div className="flex-[3_0_60%] mb-6 md:mb-0">
              <Title className="px-6 mb-3 md:mb-4 !text-lg !font-semibold">Latest Episodes</Title>
              <div className="px-3 lg:px-0 grid grid-flow-col auto-cols-[auto] md:grid-flow-row md:auto-cols-auto md:grid-cols-3 gap-2 md:gap-3 overflow-auto md:overflow-visible no-scrollbar">
                {latestEpisodes.map((item) => (
                  <Episode key={item.id} {...item} />
                ))}
              </div>
            </div>
            <div className="flex-[0_3_auto] hidden lg:flex flex-col">
              <Title className="px-6 mb-3 md:mb-4 !text-lg !font-semibold">Genres</Title>
              <div className="flex-1 rounded-lg px-3 md:px-0 bg-dark">
                <Genres data={genres} />
              </div>
            </div>
          </div>
          <div className="lg-container mb-5 md:mb-8 lg:hidden">
            <Title className="px-6 mb-3 md:mb-4 !text-lg !font-semibold">Genres</Title>
            <GenresRow data={genres} className="px-3" />
          </div>
          <div className="lg-container mb-5 md:mb-8">
            <Title className="px-6 mb-3 md:mb-4 !text-lg !font-semibold">Recommended</Title>
            <CardGrid className="px-3 lg:px-0" data={popular} mobileSlider={true} />
          </div>
          <div className="lg-container mb-5 md:mb-0">
            <div className="px-6 mb-3 md:mb-4 flex justify-between items-center">
              <Title className="!text-lg !font-semibold">Popular Movies</Title>
              <Link
                href="/movies"
                className="text-gray-400 text-sm md:text-base hover:text-gray-200 transition-colors"
                aria-label="To movies page"
              >
                More movies
              </Link>
            </div>
            <PosterGrid className="px-3 lg:px-0" data={popularMovies.data} />
          </div>
          <div className="lg-container md:hidden mb-5 md:mb-0">
            <div className="px-6 mb-3 md:mb-4 flex justify-between items-center">
              <Title className="!text-lg !font-semibold">Popular series</Title>
              <Link
                href="/series"
                className="text-gray-400 text-sm md:text-base hover:text-gray-200 transition-colors"
                aria-label="To series page"
              >
                More series
              </Link>
            </div>
            <CardGrid className="px-3 lg:px-0" data={series.data} mobileSlider={true} />
          </div>
          <div className="container md:hidden">
            <p className="bg-dark text-gray-300 rounded-lg p-4 leading-7">
              <span className="text-red font-bold">AniBay</span> is your top spot for free online anime streaming, with
              a wide range of high-quality subtitled anime titles to enjoy. We make sure to keep you up-to-date with
              daily episode releases, so you never miss the latest developments in your favorite series. Dive into the
              world of anime magic right at your fingertips with <span className="text-red font-bold">AniBay</span> and
              start your anime journey today!
            </p>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home

export const metadata: Metadata = {
  title: `AniBay`,
  description:
    'Anibay: Your daily dose of premium anime content, made by fans, for fans. Explore thousands of top-quality titles today!',
  openGraph: {
    images: ['/og-image.png'],
    title: 'Anibay',
    description:
      'Anibay: Your daily dose of premium anime content, made by fans, for fans. Explore thousands of top-quality titles today!',
    type: 'website',
    url: '/',
  },
}
