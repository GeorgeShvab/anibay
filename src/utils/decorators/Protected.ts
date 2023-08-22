import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextFunction, UnauthorizedException, createMiddlewareDecorator } from 'next-api-decorators'
import { getServerSession } from 'next-auth'

const Protected = createMiddlewareDecorator(async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
  console.log('ahahaha')
  const session = await getServerSession(req, res, authOptions)

  console.log(session, 'SESSION')

  if (!session) {
    throw new UnauthorizedException()
  }

  next()
})

export default Protected
