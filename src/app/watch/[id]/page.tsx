import React, { FC } from 'react'
import * as types from '@/types'
import { Metadata } from 'next'
import BackgroundImage from './BackgroundImage'
import Poster from './Poster'
import SubTitleText from './SubtitleText'
import AnimeService from '@/services/AnimeService'
import EpisodeService from '@/services/EpisodeService'
import { getServerSession } from 'next-auth'
import Layout from '@/components/Layout'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Player from '@/components/VideoPlayer/Player'
import MobileDescription from './MobileDescription'
import Actions from './Actions'
import BookmarkIcon from '@/components/BookmarkIcon'
import CardGrid from '@/components/Anime/CardGrid'
import Title from '@/components/Title'
import PosterGrid from '@/components/Anime/PosterGrid'
import { cookies } from 'next/headers'
import Genres from '@/components/Genre/Genres'
import Image from 'next/image'
import Episode from '@/components/Episode/PreviewEpisode'

const getLastWatchedEpisode = (animeId: string): string | undefined => {
  const cookiesStore = cookies()

  const episodes = cookiesStore.get('episodes')?.value

  const decoded = episodes ? decodeURI(episodes) : undefined

  if (decoded) {
    try {
      return JSON.parse(decoded)[animeId] as string
    } catch {
      return undefined
    }
  }

  return undefined
}

const WatchPage: FC<types.PageProps<{ id: string }, { episode?: string }>> = async ({ params, searchParams }) => {
  const id = params.id

  const lastEpisode = getLastWatchedEpisode(id)

  const session = await getServerSession(authOptions)

  const animePromise = AnimeService.getOne({ id, user: session?.user.id })

  const relatedPromise = AnimeService.getRelated({ id, user: session?.user.id })

  const episodesPromise = EpisodeService.getEpisodesByAnime(id)

  const popularPromise = AnimeService.getRandomPopular(session?.user?.id, 6)

  const [anime, episodes, related, popular] = await Promise.all([
    animePromise,
    episodesPromise,
    relatedPromise,
    popularPromise,
  ])

  if (!anime) return null

  return (
    <Layout>
      <main className="relative">
        <div className="h-[450px] md:h-[550px] w-full absolute z-[-1] hidden md:block">
          <img src={anime.cover || anime.image} alt="Background" className="w-full h-full object-cover" />
          <div className="search-gradient w-full h-full absolute inset-0 backdrop-blur"></div>
        </div>
        <div className="h-[450px] md:h-[550px] w-full absolute z-[-1] md:hidden">
          <img src={anime.image} alt="Background" className="w-full h-full object-cover" />
          <div className="w-full h-full absolute inset-0 main-poster-gradient"></div>
        </div>
        <Actions isBookmarked={anime.isBookmarked} id={anime.id} />
        <div className="pt-[400px] md:pt-header">
          <div className="md:pt-8 lg:pt-12 md:pt-12 lg:pt-20">
            <div className="container gap-0 mb-3 md:flex lg:gap-24 md:gap-8 md:mb-12 justify-between">
              <div className="pt-2 flex-initial md:flex flex-col relative mb-3 md:mb-0">
                <div>
                  <h1 className="text-2xl font-semibold mb-1 md:mb-2 md:text-5xl text-white">{anime.title}</h1>
                  <SubTitleText
                    totalEpisodes={anime.totalEpisodes}
                    releaseDate={anime.releaseDate}
                    status={anime.status}
                    rating={anime.rating}
                  />
                  <Genres data={anime.genres} className="mb-4 md:mb-8 flex-wrap [&>a]:text-sm md:gap-3" />
                  <div className="rounded bg-dark md:hidden shadow-3xl">
                    <MobileDescription description={anime.description} />
                  </div>
                </div>
                <p
                  className="text-neutral-300 rounded p-2 hidden md:block"
                  dangerouslySetInnerHTML={{ __html: anime.description }}
                ></p>
              </div>
              <div className="flex-[0_0_315px] hidden md:block relative">
                <div className="absolute right-[calc(100%+12px)]">
                  <BookmarkIcon id={anime.id} isBookmarked={anime.isBookmarked} />
                </div>
                <Poster alt={anime.title} url={anime.image} />
              </div>
            </div>
            <div className="container !mb-6 lg:!mb-12">
              <Player
                episodes={episodes as any}
                id={anime.id}
                title={anime.title}
                type={anime.type as types.AnimeType}
                episode={lastEpisode}
              />
            </div>
            {!!related.length && (
              <div className="lg-container mb-6 md:mb-10">
                <Title className="px-6 mb-3 md:mb-6">Related Anime</Title>
                <CardGrid className="px-3 lg:px-0" data={related} mobileSlider />
              </div>
            )}
            <div className="lg-container">
              <Title className="px-6 mb-3 md:mb-6">Popular Anime</Title>
              <PosterGrid className="px-3 lg:px-0" data={popular} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default WatchPage

export async function generateMetadata({ params }: types.PageProps<{ id: string }>): Promise<Metadata> {
  const anime = await AnimeService.getOne({ id: params.id })

  if (!anime) {
    return {
      title: 'Page Not Found',
      description: 'Current page is not exists',
      openGraph: {
        images: ['/og-image.png'],
        title: 'Page Not Found',
        description: 'Page Not Found',
        type: 'website',
        url: '/watch/' + params.id,
      },
    }
  }

  return {
    title: anime.title,
    description: `${anime.title} on Anibay`,
    openGraph: {
      images: [anime.cover || anime.image],
      title: anime?.title,
      description: `${anime.title} on Anibay`,
      type: 'website',
      url: '/watch/' + params.id,
    },
  }
}
