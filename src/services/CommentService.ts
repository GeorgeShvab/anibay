import prisma from '../../prisma/prisma'
import serialize from '@/utils/serialize'
import { Comment, User } from '@/types'

interface CommentCreationParams {
  text: string
  user: number
  episode: string
  parent?: number
}

interface CommentWithChildren extends Comment {
  children: CommentWithChildren[]
}

const CommentService = {
  async create({ text, user, episode, parent }: CommentCreationParams) {
    const data = await prisma.comment
      .create({ data: { text, episodeId: episode, userId: user, parentId: parent } })
      .catch((e) => console.log(e))

    return serialize(data)
  },

  async delete(id: number) {
    await prisma.comment.delete({ where: { id } })
  },

  async update(id: number, text: string) {
    const data = await prisma.comment.update({ where: { id }, data: { text } })

    return serialize(data)
  },

  async like(comment: number, user: number) {
    const data = await prisma.commentLike.create({ data: { commentId: comment, userId: user } })

    return serialize(data)
  },

  async getLike(comment: number, user: number) {
    const data = await prisma.commentLike.findFirst({ where: { commentId: comment, userId: user } })

    return serialize(data)
  },

  async deleteLike(id: number) {
    await prisma.commentLike.delete({ where: { id } })
  },

  async dislike(comment: number, user: number) {
    const data = await prisma.commentDislike.create({ data: { commentId: comment, userId: user } })

    return serialize(data)
  },

  async getDislike(comment: number, user: number) {
    const data = await prisma.commentDislike.findFirst({ where: { commentId: comment, userId: user } })

    return serialize(data)
  },

  async deleteDislike(id: number) {
    await prisma.commentDislike.delete({ where: { id } })
  },

  async getOne(id: number) {
    const data = await prisma.comment.findUnique({ where: { id } })

    return serialize(data)
  },

  async getCommentPartisipantsByEpisode(id: string) {
    const data =
      await prisma.$queryRaw`SELECT DISTINCT u.* FROM "Comment" comment JOIN "User" u ON comment."userId" = u.id WHERE comment."episodeId" = ${id};`

    return serialize(data) as User[]
  },

  async getReplies(comment: number, user: number | undefined) {
    const data =
      await prisma.$queryRaw`SELECT comment.*, JSON_BUILD_OBJECT('email', u.email, 'avatar', u.avatar, 'id', u.id, 'name', u.name, 'username', u.username, 'createdAt', u."createdAt"::text || 'Z', 'updatedAt', u."updatedAt"::text || 'Z') as "user", (SELECT COUNT(id) FROM "Comment" WHERE "parentId" = comment.id)::int as comments, 
      commentlike.id::boolean as "isLiked", commentdislike.id::boolean as "isDisliked", 
      CASE WHEN comment."userId" = ${user} THEN 1 ELSE 0 END AS "isAuthor",
      (SELECT COUNT(id) FROM "CommentLike" WHERE "commentId" = comment.id)::int as likes, (SELECT COUNT(id) FROM "CommentDislike" WHERE "commentId" = comment.id)::int as dislikes FROM "Comment" comment JOIN "User" u ON comment."userId" = u.id
      LEFT JOIN "CommentLike" commentlike ON commentlike."commentId" = comment."id" AND commentlike."userId" = ${user} 
      LEFT JOIN "CommentDislike" commentdislike ON commentdislike."commentId" = comment."id" AND commentdislike."userId" = ${user} 
      WHERE comment."parentId" = ${comment} ORDER BY comment."createdAt" DESC`

    return serialize(data) as Comment[]
  },

  async getTopCommentsByEpisode(episode: string, user: number | undefined) {
    const data =
      await prisma.$queryRaw`SELECT comment.*, JSON_BUILD_OBJECT('email', u.email, 'avatar', u.avatar, 'id', u.id, 'name', u.name, 'username', u.username, 'createdAt', u."createdAt"::text || 'Z', 'updatedAt', u."updatedAt"::text || 'Z') as "user", (SELECT COUNT(id) FROM "Comment" WHERE "parentId" = comment.id)::int as comments, 
      commentlike.id::boolean as "isLiked", commentdislike.id::boolean as "isDisliked", 
      CASE WHEN comment."userId" = ${user} THEN 1 ELSE 0 END AS "isAuthor",
      (SELECT COUNT(id) FROM "CommentLike" WHERE "commentId" = comment.id)::int as likes, (SELECT COUNT(id) FROM "CommentDislike" WHERE "commentId" = comment.id)::int as dislikes FROM "Comment" comment JOIN "User" u ON comment."userId" = u.id
      LEFT JOIN "CommentLike" commentlike ON commentlike."commentId" = comment."id" AND commentlike."userId" = ${user} 
      LEFT JOIN "CommentDislike" commentdislike ON commentdislike."commentId" = comment."id" AND commentdislike."userId" = ${user} 
      WHERE comment."episodeId" = ${episode} AND comment."parentId" IS NULL ORDER BY comment."createdAt" DESC`

    return serialize(data) as Comment[]
  },

  async getCommentsByEpisode(episode: string, user?: number) {
    const data: any = await prisma.$queryRaw`WITH RECURSIVE "CommentHierarchy" AS (
        SELECT comment.*, (SELECT COUNT(id) FROM "Comment" WHERE "parentId" = comment.id)::int as comments, 
        CASE WHEN comment."userId" = ${user} THEN 1 ELSE 0 END AS "isAuthor",
        (SELECT COUNT(id) FROM "CommentLike" WHERE "commentId" = comment.id)::int as likes, 
        (SELECT COUNT(id) FROM "CommentDislike" WHERE "commentId" = comment.id)::int as dislikes,
        JSON_BUILD_OBJECT('email', u.email, 'avatar', u.avatar, 'id', u.id, 'name', u.name, 'username', u.username, 'createdAt', u."createdAt"::text || 'Z', 'updatedAt', u."updatedAt"::text || 'Z') as "user",
        commentlike.id::boolean as "isLiked", commentdislike.id::boolean as "isDisliked", JSON_BUILD_ARRAY() as children
        FROM "Comment" comment
        JOIN "User" u ON u.id = comment."userId"
        LEFT JOIN "Comment" child ON comment.id = child."parentId"
        LEFT JOIN "CommentLike" commentlike ON commentlike."commentId" = comment."id" AND commentlike."userId" = ${user} 
        LEFT JOIN "CommentDislike" commentdislike ON commentdislike."commentId" = comment."id" AND commentdislike."userId" = ${user} 
        WHERE child.id IS NULL AND comment."episodeId" = ${episode}

        UNION ALL

        SELECT current.*, (SELECT COUNT(id) FROM "Comment" WHERE "parentId" = current.id)::int as comments, 
        CASE WHEN current."userId" = ${user} THEN 1 ELSE 0 END AS "isAuthor",
        (SELECT COUNT(id) FROM "CommentLike" WHERE "commentId" = current.id)::int as likes,
        (SELECT COUNT(id) FROM "CommentDislike" WHERE "commentId" = current.id)::int as dislikes,
        JSON_BUILD_OBJECT('email', u.email, 'avatar', u.avatar, 'id', u.id, 'name', u.name, 'username', u.username, 'createdAt', u."createdAt"::text || 'Z', 'updatedAt', u."updatedAt"::text || 'Z') as "user", 
        commentlike.id::boolean as "isLiked", 
        commentdislike.id::boolean as "isDisliked",
        JSON_BUILD_ARRAY(JSON_BUILD_OBJECT('id', prev.id, 'parentId', prev."parentId", 'comments', prev.comments, 'likes', prev.likes, 'user', prev.user, 'isLiked', prev."isLiked", 'children', prev.children, 
        'text', prev.text, 'userId', prev."userId", 'isAuthor', prev."isAuthor", 'episodeId', prev."episodeId", 'updatedAt', prev."updatedAt"::text || 'Z', 'createdAt', prev."createdAt"::text || 'Z'))
        AS children FROM "CommentHierarchy" prev JOIN "Comment" current ON current.id = prev."parentId" 
        JOIN "User" u ON u.id = current."userId" 
        LEFT JOIN "CommentLike" commentlike ON commentlike."commentId" = current."id" AND commentlike."userId" = ${user}
        LEFT JOIN "CommentDislike" commentdislike ON commentdislike."commentId" = current."id" AND commentdislike."userId" = ${user}) 
        SELECT * FROM "CommentHierarchy" WHERE "parentId" IS NULL;`

    const preparedData = serialize(mergeCommentBranches(data))

    return preparedData
  },
}

function mergeCommentBranches(comments: CommentWithChildren[]) {
  const result: CommentWithChildren[] = []

  for (let comment of comments) {
    if (result.find((item) => item.id === comment.id)) {
      const index = result.findIndex((item) => item.id === comment.id)

      result[index].children = mergeCommentBranches([...result[index].children, ...comment.children])
    } else {
      result.push(comment)
    }
  }

  return result
}

export default CommentService
