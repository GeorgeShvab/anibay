import { Anime, Episode } from '@/types'
import prisma from '../../prisma/prisma'
import serialize from '@/utils/serialize'

const EpisodeService = {
  async getOne(id: string) {
    const data = await prisma.episode.findFirst({ where: { id } })
    return serialize(data)
  },

  async deleteOne(id: string) {
    const data = await prisma.episode.delete({ where: { id } })
    return serialize(data)
  },

  async getEpisodesByAnime(id: string) {
    const data = await prisma.episode.findMany({ where: { animeId: id }, orderBy: { number: 'asc' } })
    return serialize(data)
  },

  async getLatestEpisodes(amount: number = 10) {
    const data = await prisma.episode.findMany({
      orderBy: { createdAt: 'desc' },
      include: { anime: true },
      take: amount,
    })

    return serialize(data) as any as (Episode & { anime: Anime })[]
  },
}

export default EpisodeService
