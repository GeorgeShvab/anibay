import IsUsernameTaken from '@/utils/decorators/user/IsUsernameTaken'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import messages from '@/locales/messages'

class UserSignupFirstStepDTO {
  @IsNotEmpty({ message: messages.INVALID_USERNAME })
  @IsString({ message: messages.USERNAME_IS_REQUIRED })
  @MinLength(2, { message: messages.INVALID_USERNAME_MIN_LENGTH })
  @MaxLength(30, { message: messages.INVALID_USERNAME_MAX_LENGTH })
  @IsUsernameTaken({ message: messages.USERNAME_IS_TAKEN })
  username: string

  @IsNotEmpty({ message: messages.INVALID_NAME })
  @IsString({ message: messages.INVALID_NAME })
  @MinLength(2, { message: messages.INVALID_NAME_MIN_LENGTH })
  @MaxLength(30, { message: messages.INVALID_NAME_MAX_LENGTH })
  name: string
}

export default UserSignupFirstStepDTO
