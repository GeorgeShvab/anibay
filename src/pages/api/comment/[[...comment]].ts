import BadRequestExceptionHandler from '@/utils/exceptions/BadRequestHandler'
import CustomBadRequestException from '@/utils/exceptions/BadRequestException'
import User from '@/utils/decorators/user/User'
import ValidationPipe from '@/utils/decorators/ValidationPipe'
import CommentCreationDTO from '@/dto/comment/comment-creation.dto'
import CommentUpdationDTO from '@/dto/comment/comment-updation.dto'
import CommentService from '@/services/CommentService'
import * as types from '@/types'
import { type JwtUser } from '@/types'
import {
  Body,
  Catch,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  createHandler,
} from 'next-api-decorators'
import Protected from '@/utils/decorators/Protected'

@Catch(BadRequestExceptionHandler, CustomBadRequestException)
class CommentController {
  @Protected()
  @Post()
  async create(@Body(ValidationPipe) body: CommentCreationDTO, @User() user: JwtUser) {
    const data = await CommentService.create({ ...body, user: user.id }).catch((e) => console.log(e))

    return {
      ...data,
      isLiked: false,
      isAuthor: true,
      comments: 0,
      likes: 0,
      user: { username: user.username, name: user.name, email: user.email, id: user.id, avatar: user.avatar },
      children: [],
    }
  }

  @Protected()
  @Delete('/:id')
  async delete(@Param('id') id: string, @User() user: JwtUser) {
    const comment = await CommentService.getOne(Number(id))

    if (!comment) throw new NotFoundException()

    if (comment.userId !== user.id) throw new ForbiddenException()

    await CommentService.delete(comment.id)
  }

  @Protected()
  @Patch('/:id')
  async update(@Body(ValidationPipe) body: CommentUpdationDTO, @Param('id') id: string, @User() user: JwtUser) {
    const comment = await CommentService.getOne(Number(id))

    if (!comment) throw new NotFoundException()

    if (comment.userId !== user.id) throw new ForbiddenException()

    return await CommentService.update(comment.id, body.text)
  }

  @Protected()
  @Post('/:id/like')
  async like(@Param('id') id: string, @User() user: JwtUser) {
    const comment = await CommentService.getOne(Number(id))

    if (!comment) throw new NotFoundException()

    const like = await CommentService.getLike(Number(id), user.id)

    if (like) {
      await CommentService.deleteLike(like.id)
    } else {
      return await CommentService.like(Number(id), user.id)
    }
  }

  @Protected()
  @Post('/:id/dislike')
  async dislike(@Param('id') id: string, @User() user: JwtUser) {
    const comment = await CommentService.getOne(Number(id))

    if (!comment) throw new NotFoundException()

    const dislike = await CommentService.getDislike(Number(id), user.id)

    if (dislike) {
      await CommentService.deleteDislike(dislike.id)
    } else {
      return await CommentService.dislike(Number(id), user.id)
    }
  }

  @Get('/:id/replies')
  async getChildren(@Param('id') id: string, @User() user: JwtUser) {
    const comments = await CommentService.getReplies(Number(id), user?.id)

    return comments
  }
}

export default createHandler(CommentController)
