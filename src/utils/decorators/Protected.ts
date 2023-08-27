import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextFunction, UnauthorizedException, createMiddlewareDecorator } from 'next-api-decorators'
import { getServerSession } from 'next-auth'

const Protected = createMiddlewareDecorator(async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    throw new UnauthorizedException()
  }

  next()
})

export default Protected
