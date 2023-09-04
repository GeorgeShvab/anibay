import prisma from '../../prisma/prisma'
import serialize from '@/utils/serialize'
import { Prisma } from '@prisma/client'
import { Anime } from '@/types'

const AnimeService = {
  async getOne({ id, user }: { id: string; user?: string }) {
    const data = await prisma.$queryRaw`SELECT a.*,
  (SELECT id FROM "Bookmark" b WHERE b."animeId" = a.id AND b."userId" = ${user})::boolean as "isBookmarked",
  ARRAY(
      SELECT DISTINCT JSONB_BUILD_OBJECT('id', g.id, 'title', g.title)
      FROM "Genre" g
      JOIN "_AnimeToGenre" ag ON ag."B" = g.id
      WHERE ag."A" = ${id}
  ) as genres,
  ARRAY(
      SELECT DISTINCT JSONB_BUILD_OBJECT(
          'id', ra.id, 'title', ra.title, 'description', ra.description, 'image', ra.image, 'cover', ra.cover,
          'releaseDate', ra."releaseDate", 'status', ra.status, 'totalEpisodes', ra."totalEpisodes",
          'type', ra.type, 'views', ra.views, 'anilistId', ra."anilistId", 'duration', ra.duration,
          'malId', ra."malId", 'popularity', ra.popularity, 'rating', ra.rating, 'season', ra.season,
          'synonyms', ra.synonyms, 'mappings', ra.mappings, 'createdAt', ra."createdAt", 'updatedAt', ra."updatedAt"
      )
      FROM "_relations" r
      JOIN "Anime" ra ON ra.id = r."B"
      WHERE r."A" = a.id
  ) as related
FROM "Anime" a
WHERE a.id = ${id};`

    return serialize((data as any)[0]) as Anime
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

  async search({ query, page = 0, genre }: { query?: string; page?: number; genre?: string }) {
    const q = `%${query}%`.toLowerCase()

    const dataPromise = genre
      ? prisma.$queryRaw`SELECT a.*, array_agg(JSON_BUILD_OBJECT('id', g.id, 'title', g.title)) as genres
    FROM "Anime" a 
    INNER JOIN "_AnimeToGenre" ag 
    ON ag."A" = a.id
    INNER JOIN "Genre" g
    ON g.id = ag."B" WHERE ag."B" = ${genre} AND (CASE WHEN ${!!query} = FALSE THEN TRUE ELSE LOWER(a.title) LIKE ${q} OR LOWER(a.description) LIKE ${q} OR LOWER(ARRAY_TO_STRING(a.synonyms, ' ')) LIKE ${q} END) GROUP BY a.id ORDER BY a.popularity DESC OFFSET ${
          page * 30
        } LIMIT 30;`
      : prisma.$queryRaw`SELECT a.*, array_agg(JSON_BUILD_OBJECT('id', g.id, 'title', g.title)) as genres
    FROM "Anime" a 
    INNER JOIN "_AnimeToGenre" ag 
    ON ag."A" = a.id
    INNER JOIN "Genre" g
    ON g.id = ag."B" WHERE LOWER(a.title) LIKE ${q} OR LOWER(a.description) LIKE ${q} OR LOWER(ARRAY_TO_STRING(a.synonyms, ' ')) LIKE ${q} GROUP BY a.id ORDER BY a.popularity DESC OFFSET ${
          page * 30
        } LIMIT 30;`

    const countPromise = genre
      ? prisma.$queryRaw`SELECT SUM(
        CASE 
            WHEN ag."B" = ${genre} AND (CASE WHEN ${!!query} = FALSE THEN TRUE ELSE LOWER(a.title) LIKE ${q} OR LOWER(a.description) LIKE ${q} OR LOWER(ARRAY_TO_STRING(a.synonyms, ' ')) LIKE ${q} END)
            THEN 1 
            ELSE 0 
        END
    )::int as count FROM "Anime" a JOIN "_AnimeToGenre" ag ON ag."A" = a.id;`
      : prisma.$queryRaw`SELECT SUM(
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

  async getRelated({ id, user }: { id: string; user?: number }) {
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

  async getAnimeByGenre({ id, user }: { id: string; user?: number }) {
    const data = await prisma.$queryRaw`SELECT a.*,
    (SELECT id FROM "Bookmark" b WHERE b."animeId" = a.id AND b."userId" = ${user})::boolean as "isBookmarked",
    ARRAY(
        SELECT DISTINCT JSONB_BUILD_OBJECT('id', g.id, 'title', g.title)
        FROM "Genre" g
        JOIN "_AnimeToGenre" ag ON ag."B" = g.id
        WHERE ag."A" = ${id}
    ) as genres
  FROM "Anime" a
  JOIN "_AnimeToGenre" ag ON ag."A" = a.id
  WHERE ag."B" = ${id};`

    return serialize(data) as Anime[]
  },

  async getBookmarkedAnime({ user, page = 0, amount = 30 }: { user: number; page?: number; amount?: number }) {
    const dataPromise = prisma.bookmark.findMany({
      where: { userId: user },
      select: { anime: { include: { genres: true } } },
      orderBy: { createdAt: 'desc' },
      skip: page * 30,
      take: 30,
    })

    const countPromise = prisma.bookmark.count({ where: { userId: user } })

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return serialize({ data: data.map((item) => ({ ...item.anime, isBookmarked: true })), count }) as any as {
      data: Anime[]
      count: number
    }
  },

  async getMovies({ orderBy = 'popularity', amount = 10 }: { orderBy?: 'popularity' | 'rating'; amount?: number }) {
    const data = await prisma.anime.findMany({
      where: { type: 'MOVIE' },
      orderBy: {
        [orderBy]: 'desc',
      },
      take: amount,
    })

    return serialize(data)
  },

  async getSeries({ orderBy = 'popularity', amount = 10 }: { orderBy?: 'popularity' | 'rating'; amount?: number }) {
    const data = await prisma.anime.findMany({
      where: { NOT: { type: 'MOVIE' } },
      orderBy: {
        [orderBy]: 'desc',
      },
      take: amount,
    })

    return serialize(data)
  },
}

export default AnimeService
