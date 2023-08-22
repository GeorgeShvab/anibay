import CommentService from '@/services/CommentService'
import EpisodeService from '@/services/EpisodeService'
import { type JwtUser } from '@/types'
import User from '@/utils/decorators/user/User'
import { Get, Param, createHandler } from 'next-api-decorators'

class EpisodeController {
  @Get('/:id/comments')
  async getComments(@Param('id') id: string, @User() user: JwtUser) {
    const data = await CommentService.getTopCommentsByEpisode(id, user?.id)

    return data
  }
}

export default createHandler(EpisodeController)
