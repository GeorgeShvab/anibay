import prisma from '../../prisma/prisma'
import serialize from '@/utils/serialize'

const BookmarkService = {
  async bookmark(user: number, anime: string) {
    const data = await prisma.bookmark.findFirst({ where: { userId: user, animeId: anime } })

    if (data) {
      await this.delete(data.id)
    } else {
      return await prisma.bookmark.create({ data: { animeId: anime, userId: user } })
    }
  },

  async delete(id: number) {
    return await prisma.bookmark.delete({ where: { id } })
  },

  async isBookmarked(user: number, anime: string) {
    return !!(await prisma.bookmark.findFirst({ where: { userId: user, animeId: anime } }))
  },
}

export default BookmarkService