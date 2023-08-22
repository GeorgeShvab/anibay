import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import messages from '@/locales/messages'

class PasswordResetDTO {
  @IsNotEmpty({ message: messages.PASSWORD_IS_REQUIRED })
  @IsString({ message: messages.INVALID_PASSWORD })
  @MinLength(2, { message: messages.INVALID_PASSWORD_MIN_LENGTH })
  @MaxLength(30, { message: messages.INVALID_PASSWORD_MAX_LENGTH })
  password: string

  @IsNotEmpty({ message: 'Verification link expired or link is invalid' })
  @IsString({ message: 'Verification link expired or link is invalid' })
  token: string
}

export default PasswordResetDTO
