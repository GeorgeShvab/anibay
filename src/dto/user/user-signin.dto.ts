import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import messages from '@/locales/messages'

export class UserSigninDTO {
  @IsEmail({}, { message: messages.INCORRECT_CREDENTIALS })
  email: string

  @IsNotEmpty({ message: messages.INCORRECT_CREDENTIALS })
  @IsString({ message: messages.INCORRECT_CREDENTIALS })
  @MinLength(3, { message: messages.INCORRECT_CREDENTIALS })
  @MaxLength(30, { message: messages.INCORRECT_CREDENTIALS })
  password: string
}
