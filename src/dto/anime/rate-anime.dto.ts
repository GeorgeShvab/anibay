import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator'

class RateAnimeDTO {
  @IsNotEmpty({ message: 'Invalid format' })
  @IsNumber({}, { message: 'Invalid format' })
  @Min(1, { message: 'Invalid score' })
  @Max(5, { message: 'Invalid score' })
  score: number
}

export default RateAnimeDTO
