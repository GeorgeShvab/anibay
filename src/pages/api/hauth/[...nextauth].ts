import UserService from '@/services/UserService'
import serialize from '@/utils/serialize'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import prisma from '../../../../prisma/prisma'
import TokenService from '@/services/TokenService'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

if (!GOOGLE_CLIENT_ID) throw new Error('Google client id not found')
if (!GOOGLE_CLIENT_SECRET) throw new Error('Google client secret not found')
if (!NEXTAUTH_SECRET) throw new Error('Next auth secret not found')

const authOptions = NextAuth({
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

        const { createdAt, updatedAt, ...u } = user

        return { ...u, id: u.id.toString() }
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

          const { createdAt, updatedAt, ...u } = user

          return { ...u, id: u.id.toString() }
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
          randomKey: token.randomKey,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        }
      }
      return token
    },
  },
})
