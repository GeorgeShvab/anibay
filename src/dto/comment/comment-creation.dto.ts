import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

class CommentCreationDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  text: string

  @IsOptional()
  @IsNumber()
  parent: number

  @IsNotEmpty()
  @IsString()
  episode: string
}

export default CommentCreationDTO
