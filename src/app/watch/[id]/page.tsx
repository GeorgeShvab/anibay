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
import Player from '@/components/VideoPlayer/Player'
import Button from '@/ui/Button'
import CardsColumn from '@/components/Anime/CardsColumn'
import MobileDescription from './MobileDescription'
import HorizontalPoster from './HorizontalCard'

const WatchPage: FC<types.PageProps<{ id: string }>> = async ({ params }) => {
  const id = params.id

  const session = await getServerSession(authOptions)

  const animePromise = AnimeService.getOne(`${id.replace(/-episode-[0-9]+/, '')}`)

  const relatedPromise = AnimeService.getRelated({ id, user: session?.user.id })

  const isBookmarkedPromise = session ? BookmarkService.isBookmarked(session.user?.id, id) : false

  const commentsPromise = CommentService.getTopCommentsByEpisode(
    `${id}-episode-1`,
    session ? session.user.id : undefined
  )

  const commentPartisipantsPromise = CommentService.getCommentPartisipantsByEpisode(`${id}-episode-1`)

  const episodesPromise = EpisodeService.getEpisodesByAnime(id)

  const popularPromise = AnimeService.getRandomPopular(session?.user?.id, 10)

  const [anime, episodes, related, isBookmarked, comments, commentPartisipants, popular] = await Promise.all([
    animePromise,
    episodesPromise,
    relatedPromise,
    isBookmarkedPromise,
    commentsPromise,
    commentPartisipantsPromise,
    popularPromise,
  ])

  if (!anime) return null

  return (
    <>
      <BackButton />
      <Layout>
        <main className="pb-6 md:pb-10 md:pt-header">
          <BackgroundImage url={anime.image} />
          <div>
            <div className="container md:py-8 lg:py-12 md:pt-12 lg:pt-20">
              <div className="gap-0 mb-3 md:flex lg:gap-12 md:gap-8 lg:mb-12 justify-between">
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
                <div className="w-full flex gap-3 md:hidden">
                  <Button className="gap-4 flex-[0_0_42.5%] !px-1" color="dark">
                    <>
                      <span className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#ffffff"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                          />
                        </svg>
                      </span>
                      <span className="text-sm">Watch now</span>
                    </>
                  </Button>
                  <Bookmark isBookmarked={isBookmarked} id={anime.id} key={anime.id + 'bookmark'} className="!px-1" />
                </div>
                <div className="flex-[0_0_315px] hidden md:flex flex-col gap-3 items-center">
                  <Poster alt={anime.title} url={anime.image} />
                  <div className="w-full flex gap-3">
                    <Button className="gap-3 flex-[0_0_42.5%] !px-1" color="dark">
                      <>
                        <span className="text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ffffff"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            />
                          </svg>
                        </span>
                        <span className="text-sm">Watch now</span>
                      </>
                    </Button>
                    <Bookmark isBookmarked={isBookmarked} id={anime.id} key={anime.id + 'bookmark'} className="!px-1" />
                  </div>
                </div>
              </div>
              <div className="mb-6 lg:mb-12">
                <Player
                  episodes={episodes as any}
                  id={anime.id}
                  title={anime.title}
                  type={anime.type as types.AnimeType}
                />
              </div>
              <div className="block lg:flex gap-8">
                <Comments />
                <div className="lg:flex-[0_0_365px]">
                  {!!related.length && (
                    <div className="mb-6">
                      <h3 className="px-3 mb-3 md:px-2 md:mb-6 text-white md:text-xl lg:text-2xl font-semibold">
                        Related Anime
                      </h3>
                      <div className="flex flex-col gap-4 flex-1">
                        {related?.slice(0, 5).map((item) => (
                          <HorizontalPoster key={item.id} {...item} />
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="px-3 mb-3 md:px-2 md:mb-6 text-white md:text-xl lg:text-2xl font-semibold">
                      Popular Anime
                    </h3>
                    <div className="flex flex-col gap-4 flex-1">
                      {popular.slice(0, 10 - Math.min(related.length, 5)).map((item) => (
                        <HorizontalPoster key={item.id} {...item} />
                      ))}
                    </div>
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

export default WatchPage

export async function generateMetadata({ params }: types.PageProps<{ id: string }>): Promise<Metadata> {
  const anime = await AnimeService.getOne(params.id)

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
