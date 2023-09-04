import CardGrid from '@/components/Anime/CardGrid'
import AnimeService from '@/services/AnimeService'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

interface Props {
  page?: number
}

const Bookmarked: FC<Props> = async ({ page = 1 }) => {
  const session = await getServerSession(authOptions)

  const bookmarkedAnimePromise = session?.user
    ? AnimeService.getBookmarkedAnime({ user: session?.user.id, page: page < 1 ? 0 : page - 1 })
    : null
  const hasNextPagePromise = session?.user
    ? AnimeService.getBookmarkedAnime({ user: session?.user.id, page: page < 1 ? 1 : page })
    : null

  const [results, nextPage] = await Promise.all([bookmarkedAnimePromise, hasNextPagePromise])

  if (!results) return null

  return (
    <div>
      <CardGrid className="px-3 lg:px-0" data={results.data} />
    </div>
  )
}

export default Bookmarked
