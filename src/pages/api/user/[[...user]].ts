import CustomBadRequestException from '@/utils/exceptions/BadRequestException'
import BadRequestExceptionHandler from '@/utils/exceptions/BadRequestHandler'
import ValidationPipe from '@/utils/decorators/ValidationPipe'
import UserSignupFirstStepDTO from '@/dto/user/signup-first-step.dto'
import { UserSignupDTO } from '@/dto/user/user-signup.dto'
import UserService from '@/services/UserService'
import TokenService from '@/services/TokenService'
import { BadRequestException, Body, Catch, NotFoundException, Patch, Post, createHandler } from 'next-api-decorators'
import MailService from '@/services/MailService'
import PasswordResetDTO from '@/dto/user/password-reset.dto'
import RequestPasswordResetDTO from '@/dto/user/request-password-reset.dto'
import UpdatePasswordDTO from '@/dto/user/update-password.dto'
import { type JwtUser } from '@/types'
import User from '@/utils/decorators/user/User'
import Protected from '@/utils/decorators/Protected'
import messages from '@/locales/messages'
import UpdateNameDTO from '@/dto/user/update-name.dto'

@Catch(BadRequestExceptionHandler, CustomBadRequestException)
class UserController {
  @Post('/signup')
  async signup(
    @Body(ValidationPipe)
    body: UserSignupDTO
  ) {
    const data = await UserService.create(body)

    await MailService.sendVerificationEmail(body.email, body.name, data.id)
  }

  @Post('/signin')
  async signin(@Body() body: UserSignupDTO) {
    const user = await UserService.validate(body.email, body.password)

    if (!user) throw new BadRequestException()

    return user
  }

  @Post('/signup/first-step')
  async signupFirstStep(@Body(ValidationPipe) body: UserSignupFirstStepDTO) {
    return {}
  }

  @Post('/password-reset/request')
  async requestPasswordReset(@Body(ValidationPipe) body: RequestPasswordResetDTO) {
    const user = await UserService.getOneByEmail(body.email)

    if (!user) throw new NotFoundException()

    await MailService.sendPasswordResetEmail(body.email, user.id)
  }

  @Post('/password-reset')
  async resetPassword(@Body(ValidationPipe) body: PasswordResetDTO) {
    const payload = await TokenService.validateToken(body.token)

    const user = await UserService.getOneByEmail(payload.email)

    if (!user) throw new NotFoundException()

    await UserService.updatePassword(user.id, body.password)
  }

  @Patch('/update/password')
  @Protected()
  async updatePassword(@Body(ValidationPipe) body: UpdatePasswordDTO, @User() user: JwtUser) {
    const isValid = await UserService.validate(user.email, body.oldPassword)

    if (!isValid) {
      throw new CustomBadRequestException('Old password is incorrect', { oldPassword: messages.INCORRECT_OLD_PASSWORD })
    }

    await UserService.updatePassword(user.id, body.password)
  }

  @Patch('/update/name')
  @Protected()
  async updateName(@Body(ValidationPipe) body: UpdateNameDTO, @User() user: JwtUser) {
    return await UserService.update({ name: body.name, username: body.username, id: user.id })
  }
}

export default createHandler(UserController)
