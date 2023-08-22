import IsEmailTaken from '@/utils/decorators/user/IsEmailTaken'
import IsUsernameTaken from '@/utils/decorators/user/IsUsernameTaken'
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import messages from '@/locales/messages'

export class UserSignupDTO {
  @IsNotEmpty({ message: messages.USERNAME_IS_REQUIRED })
  @IsString({ message: messages.INVALID_USERNAME })
  @MinLength(2, { message: messages.INVALID_USERNAME_MIN_LENGTH })
  @MaxLength(30, { message: messages.INVALID_USERNAME_MAX_LENGTH })
  @IsUsernameTaken({ message: messages.USERNAME_IS_TAKEN })
  username: string

  @IsEmail({}, { message: messages.EMAIL_IS_REQUIRED })
  @IsEmailTaken({ message: messages.EMAIL_IS_TAKEN })
  email: string

  @IsNotEmpty({ message: messages.NAME_IS_REQUIRED })
  @IsString({ message: messages.INVALID_NAME })
  @MinLength(2, { message: messages.INVALID_NAME_MIN_LENGTH })
  @MaxLength(30, { message: messages.INVALID_NAME_MAX_LENGTH })
  name: string

  @IsNotEmpty({ message: messages.PASSWORD_IS_REQUIRED })
  @IsString({ message: messages.INVALID_PASSWORD })
  @MinLength(2, { message: messages.INVALID_PASSWORD_MIN_LENGTH })
  @MaxLength(30, { message: messages.INVALID_PASSWORD_MAX_LENGTH })
  password: string
}
