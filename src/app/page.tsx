import { FC } from 'react'
import { getServerSession } from 'next-auth'
import AnimeService from '@/services/AnimeService'
import Layout from '@/components/Layout'
import { authOptions } from './api/auth/[...nextauth]/route'
import GenreService from '@/services/GenreService'
import MainPoster from './MainPoster'
import { Anime } from '@/types'
import { Metadata } from 'next'
import CardGrid from '@/components/Anime/CardGrid'
import PosterGrid from '@/components/Anime/PosterGrid'
import Title from '@/components/Title'
import Genres from '@/components/Genres'

const Home: FC = async () => {
  const session = await getServerSession(authOptions)

  const posterAnimePromise = AnimeService.getOne({ id: 'clfrvc5mj00chkslucw4phc3j' })

  const popularPromise = AnimeService.getRandomPopular(session?.user.id, 10)
  const genresPromise = GenreService.getAll()
  const topPropmise = AnimeService.getRandomTop(session?.user.id, 6)

  const [popular, genres, top, posterAnime] = await Promise.all([
    popularPromise,
    genresPromise,
    topPropmise,
    posterAnimePromise,
  ])

  const anime = posterAnime as any as Anime

  return (
    <Layout>
      <main className="">
        <MainPoster {...anime} />
        <div className="md:mt-[-100px] z-10 relative">
          <div className="">
            <div className="lg-container mb-6 md:mb-10">
              <Title className="px-6 mb-3 md:mb-6">Best Genres</Title>
              <Genres className="px-3 lg:px-0" data={genres} />
            </div>
            <div className="lg-container mb-6 md:mb-10">
              <Title className="px-6 mb-3 md:mb-6">Popular Anime</Title>
              <CardGrid className="px-3 lg:px-0" data={popular} mobileSlider={true} />
            </div>
            <div className="lg-container">
              <Title className="px-6 mb-3 md:mb-6">Top Anime</Title>
              <PosterGrid className="px-3 lg:px-0" data={top} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
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
