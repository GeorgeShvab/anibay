import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'

class CommentUpdationDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  text: string
}

export default CommentUpdationDTO
