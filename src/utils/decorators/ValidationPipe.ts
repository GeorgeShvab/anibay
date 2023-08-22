import { plainToClass } from 'class-transformer'
import { ValidatorOptions, validate } from 'class-validator'
import { BadRequestException } from 'next-api-decorators'
import { PipeMetadata } from 'next-api-decorators/dist/pipes/ParameterPipe'
import CustomBadRequestException from '../exceptions/BadRequestException'

const ValidationPipe =
  (options?: ValidatorOptions) => async (body: { [key: string]: any }, meta?: PipeMetadata<unknown>) => {
    if (!meta) return body

    if (!body) throw new BadRequestException()

    const dto = plainToClass(meta.metaType as any, body) as any

    const errors = await validate(dto, options)

    if (errors.length > 0) {
      const result: { [key: string]: any } = {}

      for (let error of errors) {
        result[error.property] = error.constraints
          ? error.constraints[Object.keys(error.constraints)[Object.keys(error.constraints).length - 1]]
          : null
      }

      throw new CustomBadRequestException('Invalid request', result)
    }

    return body
  }

export default ValidationPipe()
