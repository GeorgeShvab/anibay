import BookmarkService from '@/services/BookmarkService'
import { type JwtUser } from '@/types'
import Protected from '@/utils/decorators/Protected'
import User from '@/utils/decorators/user/User'
import { Delete, createHandler } from 'next-api-decorators'

class Bookmark {
  @Protected()
  @Delete('/clear')
  async clearAll(@User() user: JwtUser) {
    await BookmarkService.clearAll(user.id)
  }
}

export default createHandler(Bookmark)
