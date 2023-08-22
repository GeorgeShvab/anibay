import { IsEmail, IsNotEmpty } from 'class-validator'
import messages from '@/locales/messages'

class RequestPasswordResetDTO {
  @IsNotEmpty({ message: messages.INVALID_EMAIL })
  @IsEmail({}, { message: messages.INVALID_EMAIL })
  email: string
}

export default RequestPasswordResetDTO
