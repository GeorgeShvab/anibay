import { captureException } from '@sentry/node'
import { NextApiRequest, NextApiResponse } from 'next'
import BadRequestException from './BadRequestException'

function BadRequestExceptionHandler(error: BadRequestException, req: NextApiRequest, res: NextApiResponse) {
  captureException(error)
  return res.status(400).json({ message: error.message, errors: error.data })
}

export default BadRequestExceptionHandler
