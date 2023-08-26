import React, { FC } from 'react'
import * as types from '@/types'
import { Metadata } from 'next'
import BackgroundImage from './BackgroundImage'
import Poster from './Poster'
import SubTitleText from './SubtitleText'
import Genres from './Genres'
import BackButton from '@/components/Mobile/BackButton'
import Head from 'next/head'
import AnimeService from '@/services/AnimeService'
import EpisodeService from '@/services/EpisodeService'
import { getServerSession } from 'next-auth'
import Bookmark from '../../../components/Bookmark'
import BookmarkService from '@/services/BookmarkService'
import Layout from '@/components/Layout'
import CommentService from '@/services/CommentService'
import Comments from './Comments'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Player from '@/components/VideoPlayer'
import Button from '@/ui/Button'
import MobileDescription from './MobileDescription'
import HorizontalPoster from './HorizontalCard'
import Actions from './Actions'
import BookmarkIcon from '@/components/BookmarkIcon'
import Card from '@/components/Anime/PosterCard'
import CardGrid from '@/components/Anime/CardGrid'
import Title from '@/components/Title'
import PosterGrid from '@/components/Anime/PosterGrid'

const WatchPage: FC<types.PageProps<{ id: string }>> = async ({ params }) => {
  const id = params.id

  const session = await getServerSession(authOptions)

  const animePromise = AnimeService.getOne({ id, user: session?.user.id })

  const relatedPromise = AnimeService.getRelated({ id, user: session?.user.id })

  const episodesPromise = EpisodeService.getEpisodesByAnime(id)

  const popularPromise = AnimeService.getRandomPopular(session?.user?.id, 10)

  const [anime, episodes, related, popular] = await Promise.all([
    animePromise,
    episodesPromise,
    relatedPromise,
    popularPromise,
  ])

  if (!anime) return null

  return (
    <>
      <Layout>
        <main className="md:pb-16 md:pt-header relative">
          <BackgroundImage url={anime.image} />
          <Actions isBookmarked={anime.isBookmarked} id={anime.id} />
          <div>
            <div className="md:pt-8 lg:pt-12 md:pt-12 lg:pt-20">
              <div className="container gap-0 mb-3 md:flex lg:gap-12 md:gap-8 lg:mb-12 justify-between">
                <div className="pt-2 flex-initial md:flex flex-col relative mb-3 md:mb-0">
                  <div>
                    <h1 className="text-2xl font-semibold mb-1 md:mb-2 md:text-5xl text-white">{anime.title}</h1>
                    <SubTitleText
                      totalEpisodes={anime.totalEpisodes}
                      releaseDate={anime.releaseDate}
                      status={anime.status}
                      rating={anime.rating}
                    />
                    <Genres genres={anime.genres} />
                    <div className="rounded bg-dark md:hidden shadow-3xl">
                      {anime.description.length > 100 ? (
                        <MobileDescription description={anime.description} />
                      ) : (
                        <p
                          className="text-neutral-400 text-justify"
                          dangerouslySetInnerHTML={{ __html: anime.description }}
                        ></p>
                      )}
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
                />
              </div>
              {!!related.length && (
                <div className="lg-container mb-6 md:mb-10">
                  <Title className="px-6 mb-3 md:mb-6">Related Anime</Title>
                  <CardGrid className="px-3 md:px-0" data={related} mobileSlider />
                </div>
              )}
              <div className="lg-container">
                <Title className="px-6 mb-3 md:mb-6">Popular Anime</Title>
                <PosterGrid className="px-3 md:px-0" data={popular} />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
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
        images: ['/auth-bg.png'],
        title: 'Page Not Found',
        description: 'Page Not Found',
        type: 'website',
        url: '/watch/' + params.id,
      },
    }
  }

  return {
    title: anime.title,
    description: `Watch ${anime.title} on Anibay`,
    openGraph: {
      images: [anime.cover || anime.image],
      title: anime?.title,
      description: `Watch ${anime.title} on Anibay`,
      type: 'website',
      url: '/watch/' + params.id,
    },
  }
}
