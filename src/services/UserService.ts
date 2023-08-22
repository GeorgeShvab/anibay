import prisma from '../../prisma/prisma'
import bcrypt from 'bcrypt'

interface UserCreation {
  username: string
  name: string
  email: string
  password: string
}

interface UserCreationWithProvider {
  name: string
  email: string
  avatar?: string
}

const UserService = {
  async create(data: UserCreation) {
    const password = await this.hashPassword(data.password)

    return await prisma.user.create({ data: { ...data, password } })
  },

  async createWithProvider(data: UserCreationWithProvider) {
    const temporaryUsername = data.email.split('@')[0] + Math.ceil(Math.random() * 100)

    return await prisma.user.create({
      data: { ...data, username: temporaryUsername, password: null, avatar: data.avatar },
    })
  },

  async getOne(id: number) {
    return await prisma.user.findUnique({ where: { id } })
  },

  async getOneByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email, NOT: { emailVerified: null } } })
  },

  async validate(email: string, password: string) {
    const data = await prisma.user.findFirst({ where: { email, NOT: { emailVerified: null } } })

    if (!data?.password) return null

    if (!data || !(await this.compare(password, data.password))) return null

    return data
  },

  async deleteOne(id: number) {
    await prisma.user.delete({ where: { id } })
  },
  async isEmailTaken(email: string) {
    return !!(await prisma.user.count({ where: { email, NOT: { emailVerified: null } } }))
  },

  async IsUsernameTaken(username: string) {
    return !!(await prisma.user.count({ where: { username, NOT: { emailVerified: null } } }))
  },

  async verify(id: number) {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) throw new Error('User not found')

    return await prisma.user.update({ where: { id: user.id }, data: { emailVerified: new Date().toISOString() } })
  },
  async updatePassword(user: number, password: string) {
    const hashedPassword = await this.hashPassword(password)

    await prisma.user.update({ where: { id: user }, data: { password: hashedPassword } })
  },

  async compare(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword)
  },
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt()

    return await bcrypt.hash(password, salt)
  },
}

export default UserService
