import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import UserService from '@/services/UserService'
import serialize from '@/utils/serialize'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import TokenService from '@/services/TokenService'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

if (!GOOGLE_CLIENT_ID) throw new Error('Google client id not found')
if (!GOOGLE_CLIENT_SECRET) throw new Error('Google client secret not found')
if (!NEXTAUTH_SECRET) throw new Error('Next auth secret not found')

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: '' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const { password, email } = credentials

        const user = await UserService.validate(email, password)

        if (!user) return null

        return serialize(user) as any
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      async profile(profile, tokens) {
        let data = await UserService.getOneByEmail(profile.email)

        if (!data) {
          data = await UserService.createWithProvider({
            email: profile.email,
            name: profile.name,
            avatar: profile.image,
          })
        }

        return { ...data, ...profile }
      },
    }),
    {
      id: 'email-verification',
      name: 'Email verification',
      type: 'credentials',
      credentials: {
        token: { label: 'token', type: 'text' },
      },
      async authorize(credentials: any) {
        try {
          const data = await TokenService.validateToken(credentials.token)

          const user = await UserService.getOneByEmail(data.email)

          if (!user) return null

          return serialize(user) as any
        } catch (e) {
          return null
        }
      },
    },
  ],
  pages: { signIn: '/signin' },
  secret: NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          avatar: token.avatar,
          username: token.username,
          createdAt: token.createdAt,
          updatedAt: token.updatedAt,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          avatar: u.avatar,
          username: u.username,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        }
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
