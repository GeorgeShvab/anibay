import CustomBadRequestException from '@/utils/exceptions/BadRequestException'
import BadRequestExceptionHandler from '@/utils/exceptions/BadRequestHandler'
import ValidationPipe from '@/utils/decorators/ValidationPipe'
import UserSignupFirstStepDTO from '@/dto/user/signup-first-step.dto'
import { UserSignupDTO } from '@/dto/user/user-signup.dto'
import UserService from '@/services/UserService'
import TokenService from '@/services/TokenService'
import { BadRequestException, Body, Catch, NotFoundException, Post, createHandler } from 'next-api-decorators'
import MailService from '@/services/MailService'
import PasswordResetDTO from '@/dto/user/password-reset.dto'
import RequestPasswordResetDTO from '@/dto/user/request-password-reset.dto'

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
}

export default createHandler(UserController)
