import { NextApiRequest } from 'next'
import { createParamDecorator } from 'next-api-decorators'
import { getToken } from 'next-auth/jwt'

const User = createParamDecorator(async (req: NextApiRequest) => {
  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!user) {
    return null
  }

  return { ...user, id: Number(user?.id), sub: Number(user?.id) }
})

export default User
