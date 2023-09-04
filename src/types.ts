import { DefaultUser } from 'next-auth'
import { RefObject } from 'react'
import ReactPlayer from 'react-player'

export interface Source {
  url: string
  quality: string
}

export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export interface PageProps<T = { [key: string]: string }, B = { [key: string]: string }> {
  params: T
  searchParams: B
}

export interface PageError {
  status?: number
  msg?: string
  error: true
}

export interface Episode {
  id: string
  number: number
  sources: Source[]
  title: string
  createdAt: string
  updatedAt: string
}

export interface AnimeDataResponse {
  id: string
  title: string
  url: string
  genres: string[]
  totalEpisodes: number
  image: string
  releaseDate: string
  description: string
  subOrDub: string
  type: string
  status: string
  otherName: string
  episodes: Episode[]
}

export interface StreamingResponse {
  headers: {
    Referrer: string
  }
  download: string
  sources: { url: string; isM3U8: boolean; quality: string }[]
}

export type AnimeType = 'MOVIE' | 'SERIAL'

export type Page = 'watch' | 'home' | 'search' | 'top' | 'movies' | 'genres' | 'account' | 'saved'

export interface Anime {
  id: string
  title: string
  anilistId: number
  malId: number
  image: string
  cover: string
  season: string
  releaseDate: number
  duration: number
  popularity: number
  description: string
  genres: Genre[]
  rating: number
  status: string
  synonyms: string[]
  mappings: {
    mal: number
    anidb: number
    kitsu: number
    anilist: number
    thetvdb: number
    anisearch: number
    livechart: number
    'notify.moe': string
    'anime-planet': string
  }
  totalEpisodes: number
  views: number
  type: string
  createdAt: string
  updatedAt: string
  isBookmarked: boolean
}
export interface Source {
  url: string
  isM3U8: boolean
  quality: string
}

export interface User {
  id: number
  username: string
  name: string
  email: string
  password: string
  bio: string
  avatar: string
  verified: boolean
}

export interface ValidationError {
  errors: { [key: string]: string }
  msg: string
}

export interface ServerResponse<T> {
  data: T
}

export interface JwtUser extends Omit<User, 'password'> {
  iat: number
  exp: number
  jti: string
  sub: string
}

export interface UserRating {
  id: number
  animeId: string
  score: number
  userId: number
  createdAt: string
  updatedAt: string
}

export interface Genre {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  createdAt: string
  episodeId: string
  id: number
  parentId: number
  text: string
  updatedAt: string
  userId: number
  likes: number
  comments: number
  user: User
  isLiked: boolean
  isAuthor: boolean
  isDisliked: boolean
  dislikes: number
}

export type Severity = 'danger' | 'success'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      username: string
      avatar?: string
    } & DefaultUser
  }
}

declare module 'react' {
  interface CSSProperties {
    '--main-poster-image'?: string
    '--main-poster-cover'?: string
    '--poster'?: string
  }
}
