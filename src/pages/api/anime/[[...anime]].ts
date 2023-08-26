import User from '@/utils/decorators/user/User'
import RateAnimeDTO from '@/dto/anime/rate-anime.dto'
import AnimeService from '@/services/AnimeService'
import BookmarkService from '@/services/BookmarkService'
import RatingService from '@/services/RatingService'
import {
  BadRequestException,
  Body,
  createHandler,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  SetHeader,
} from 'next-api-decorators'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import ValidationPipe from '@/utils/decorators/ValidationPipe'
import UserService from '@/services/UserService'
import { type JwtUser } from '@/types'

class AnimeController {
  @Get('/random')
  async getRandom() {
    const data = await AnimeService.getOneRandom()

    return data
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    const data = await AnimeService.getOne({ id })

    if (!data) throw new NotFoundException()

    return data
  }

  @Get('/:id/related')
  async getRelated(@Param('id') id: string, @Query() { page = '0' }: { page: string }, @User() user: JwtUser) {
    if (page && isNaN(Number(page))) throw new BadRequestException()

    const data = await AnimeService.getRelated({ id, user: user?.id })

    if (!data) throw new NotFoundException()

    return data
  }

  @SetHeader('Access-Control-Allow-Origin', '*')
  @Post('/:id/rate')
  async rate(@Body(ValidationPipe) body: RateAnimeDTO, @Param('id') id: string, @User() user: JwtUser) {
    const data = await AnimeService.getOne({ id })

    if (!data) throw new NotFoundException()

    return await RatingService.rate(user.id, id, body.score)
  }

  @SetHeader('Access-Control-Allow-Origin', '*')
  @Post('/:id/bookmark')
  async bookmark(@Param('id') id: string, @User() user: JwtUser) {
    const data = await AnimeService.getOne({ id })

    if (!data) throw new NotFoundException()

    return await BookmarkService.bookmark(user.id, id)
  }

  @Get('/search/:query')
  async search(@Param('query') query: string) {
    const data = await AnimeService.search(query)

    return data
  }
}

export default createHandler(AnimeController)
