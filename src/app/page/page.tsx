import AnimeService from '@/services/AnimeService'
import { FC } from 'react'

const Page: FC = async () => {
  const posterAnimePromise = await AnimeService.getOne({ id: 'clfrvhqio00unkslu0ddf0nc9' })

  return (
    <main className="h-screen w-screen">
      <img src={posterAnimePromise.cover} style={{ width: '100%', height: '75%', objectFit: 'cover' }} />
    </main>
  )
}

export default Page
