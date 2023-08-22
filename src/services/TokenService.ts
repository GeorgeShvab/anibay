import prisma from '../../prisma/prisma'
import randtoken from 'rand-token'
import UserService from './UserService'

const TokenService = {
  generateToken() {
    return randtoken.generate(64)
  },

  async saveToken(email: string, token: string, user: number) {
    return await prisma.token.create({
      data: { email, token, userId: user, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) },
    })
  },

  async getOne(token: string) {
    return await prisma.token.findFirst({ where: { token } })
  },

  async verify(token: string) {
    const payload = await this.validateToken(token)

    await UserService.verify(payload.userId)
  },

  async validateToken(token: string) {
    const payload = await this.getOne(token)

    if (!payload) throw new Error('Validation token was not found')

    if (new Date(payload.expires).getTime() < Date.now()) throw new Error('Validation token expired')

    return payload
  },
}

export default TokenService
