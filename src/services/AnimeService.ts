import prisma from '../../prisma/prisma'
import serialize from '@/utils/serialize'
import { Prisma } from '@prisma/client'
import { Anime } from '@/types'

const AnimeService = {
  async getOne(id: string) {
    const data = await prisma.anime.findFirst({
      where: { id: id },
      include: {
        genres: true,
        related: true,
        episodes: {
          orderBy: {
            number: 'asc',
          },
        },
      },
    })

    return serialize(data)
  },

  async deleteOne(id: string) {
    const data = await prisma.anime.delete({ where: { id: id } })
    return serialize(data)
  },

  async deleteMany(id: string) {
    const data = await prisma.anime.deleteMany({ where: { id: id } })
    return serialize(data)
  },

  async getPopular(user: number | undefined, amount: number = 5) {
    const data =
      await prisma.$queryRaw`SELECT a.*, (SELECT id FROM "Bookmark" b WHERE b."animeId" = a.id AND b."userId" = ${user})::boolean as "isBookmarked" FROM "Anime" a ORDER BY a."popularity" DESC LIMIT ${amount};`

    return serialize(data) as Anime[]
  },

  async getRandomPopular(user: number | undefined, amount: number = 5) {
    const data =
      await prisma.$queryRaw`SELECT a.* FROM (SELECT a.*, (SELECT id FROM "Bookmark" b WHERE b."animeId" = a.id AND b."userId" = ${user})::boolean as "isBookmarked" FROM "Anime" a ORDER BY a."popularity" DESC
       LIMIT 100) AS a ORDER BY RANDOM() LIMIT ${amount};`

    return serialize(data) as Anime[]
  },

  async getTop(user: number | undefined, amount: number = 5) {
    const data =
      await prisma.$queryRaw`SELECT a.*, (SELECT id FROM "Bookmark" b WHERE b."animeId" = a.id AND b."userId" = ${user})::boolean as "isBookmarked" FROM "Anime" a ORDER BY a."rating" DESC LIMIT ${amount};`

    return serialize(data) as Anime[]
  },

  async getRandomTop(user: number | undefined, amount: number = 5) {
    const data =
      await prisma.$queryRaw`SELECT a.* FROM (SELECT a.*, (SELECT id FROM "Bookmark" b WHERE b."animeId" = a.id AND b."userId" = ${user})::boolean as "isBookmarked" FROM "Anime" a ORDER BY a."rating" DESC
       LIMIT 100) AS a ORDER BY RANDOM() LIMIT ${amount};`

    return serialize(data) as Anime[]
  },

  async search(query: string, page = 0) {
    const q = `%${query}%`.toLowerCase()

    const dataPromise = prisma.$queryRaw`SELECT a.*, array_agg(JSON_BUILD_OBJECT('id', g.id, 'title', g.title)) as genres
    FROM "Anime" a 
    INNER JOIN "_AnimeToGenre" ag 
    ON ag."A" = a.id
    INNER JOIN "Genre" g
    ON g.id = ag."B" WHERE LOWER(a.title) LIKE ${q} OR LOWER(a.description) LIKE ${q} OR LOWER(ARRAY_TO_STRING(a.synonyms, ' ')) LIKE ${q} GROUP BY a.id ORDER BY a.popularity DESC OFFSET ${
      page * 30
    } LIMIT 30;`

    const countPromise = prisma.$queryRaw`SELECT SUM(
      CASE 
          WHEN LOWER(a.title) LIKE ${q}
               OR LOWER(a.description) LIKE ${q}
               OR LOWER(ARRAY_TO_STRING(a.synonyms, ' ')) LIKE ${q}
          THEN 1 
          ELSE 0 
      END
  )::int as count FROM "Anime" a;`

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return serialize({ data: data as Anime[], count: (count as [{ count: number }])[0].count })
  },

  async getOneRandom() {
    const data = ((await prisma.$queryRaw`SELECT * FROM "Anime" ORDER BY random() LIMIT 1`) as any)[0]
    return serialize(data) as Anime
  },

  async getRelated({ id, user }: { id: string; user?: string }) {
    const data =
      await prisma.$queryRaw`SELECT a.*, (SELECT id FROM "Bookmark" b WHERE b."animeId" = a.id AND b."userId" = ${user})::boolean as "isBookmarked" 
      FROM "_relations" r JOIN "Anime" a ON a.id = r."B" WHERE r."A" = ${id}`

    return serialize(data) as Anime[]
  },

  async getRelatedByGenres(genres: string[]): Promise<Anime[]> {
    const data = await prisma.$queryRaw`SELECT A.*
    FROM "Anime" A
    JOIN "_AnimeToGenre" AG ON A.id = AG."A"
    JOIN "Genre" G ON AG."B" = G.id
    WHERE G.id IN (${Prisma.join(genres)})
    GROUP BY A.id
    HAVING COUNT(DISTINCT G.id) >= 3;`

    return serialize(data) as Anime[]
  },
}

export default AnimeService