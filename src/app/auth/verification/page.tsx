import Layout from '@/components/Layout'
import Button from '@/ui/Button'
import TokenService from '@/services/TokenService'
import Head from 'next/head'
import { FC } from 'react'
import { PageProps } from '@/types'
import Signin from './Signin'
import { Metadata } from 'next'

const EmailVerificationPage: FC<PageProps<{}, { token: string }>> = async ({ searchParams }) => {
  const token = searchParams.token

  let isError = false

  try {
    await TokenService.verify(token as string)
  } catch (e) {
    isError = true
  }

  return (
    <>
      <Layout simpleHeader>
        <main className="h-screen px-3 md:px-6 bg-auth">
          {token && !isError && <Signin token={token} />}
          <div className="h-full flex items-center justify-center">
            <div className="max-w-[400px] w-full overflow-hidden rounded-[18px] bg-dark text-left align-middle shadow-2xl transition-all relative">
              <div className="py-10 px-10 md:px-16">
                <div className="mb-16">
                  <h3 className="text-white text-[26px] md:text-[28px] font-bold whitespace-nowrap text-center flex justify-center mb-3">
                    {isError ? 'Verification error' : 'Registration completed'}
                  </h3>
                  <p className="text-center text-neutral-300 text-sm">
                    {isError
                      ? 'Verification link expired or link is invalid'
                      : 'In few seconds you will be redirected to home page'}
                  </p>
                </div>
                <div className="">
                  <div className="flex flex-col gap-4 mb-8">
                    <Button href="/">To home page</Button>
                  </div>
                  <p className="text-neutral-400 text-center text-sm">&copy;2023 Anibay. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default EmailVerificationPage

export const metadata: Metadata = {
  title: `Email verification`,
  description: 'Complete registration by verifying your email',
  openGraph: {
    images: ['/auth-bg.png'],
    title: 'Complete registration by verifying your email',
    description: 'Complete registration by verifying your email',
    type: 'website',
    url: '/auth/verification',
  },
}
