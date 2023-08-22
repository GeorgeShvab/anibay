import prisma from '../../prisma/prisma'
import serialize from '@/utils/serialize'

const RatingService = {
  async rate(user: number, anime: string, score: number) {
    const data = await prisma.rating.findFirst({ where: { userId: user, animeId: anime } })

    if (data) this.delete(data.id)

    return await prisma.rating.create({ data: { score, userId: user, animeId: anime } })
  },

  async getRating(id: string) {
    const data = await prisma.rating.aggregate({
      where: {
        anime: {
          id,
        },
      },
      _avg: {
        score: true,
      },
      _count: true,
    })

    return serialize({ rating: data._avg.score, count: data._count })
  },

  async delete(id: number) {
    await prisma.rating.delete({ where: { id } })
  },

  async getAnimeRatingByUser(user: number, anime: string) {
    const data = await prisma.rating.findFirst({ where: { userId: user, animeId: anime } })

    return serialize(data)
  },
}

export default RatingService
