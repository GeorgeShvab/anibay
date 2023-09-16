import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import messages from '@/locales/messages'

class updatePasswordDTO {
  @IsNotEmpty({ message: messages.INCORRECT_OLD_PASSWORD })
  @IsString({ message: messages.INCORRECT_OLD_PASSWORD })
  @MinLength(2, { message: messages.INCORRECT_OLD_PASSWORD })
  @MaxLength(30, { message: messages.INCORRECT_OLD_PASSWORD })
  oldPassword: string

  @IsNotEmpty({ message: messages.PASSWORD_IS_REQUIRED })
  @IsString({ message: messages.INVALID_PASSWORD })
  @MinLength(2, { message: messages.INVALID_PASSWORD_MIN_LENGTH })
  @MaxLength(30, { message: messages.INVALID_PASSWORD_MAX_LENGTH })
  password: string
}

export default updatePasswordDTO
