import prisma from '../../prisma/prisma'

const GenreService = {
  async getOne(id: string) {
    return await prisma.genre.findFirst({ where: { id } })
  },

  async getAll() {
    return await prisma.genre.findMany({})
  },
}

export default GenreService
