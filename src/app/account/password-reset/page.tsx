import Layout from '@/components/Layout'
import TokenService from '@/services/TokenService'
import { FC } from 'react'
import { Metadata } from 'next'
import { PageProps } from '@/types'
import Form from './Form'

const PasswordResetPage: FC<PageProps<{}, { token: string }>> = async ({ searchParams }) => {
  const token = searchParams.token

  let isError = false

  try {
    await TokenService.verify(token as string)
  } catch (e) {
    isError = true
  }

  return (
    <Layout simpleHeader>
      <main className="h-screen px-3 md:px-6 bg-auth">
        <div className="h-full flex items-center justify-center">
          <div className="max-w-[400px] w-full overflow-hidden rounded-[18px] bg-dark text-left align-middle shadow-2xl transition-all relative">
            <div className="py-10 px-10 md:px-16">
              <Form isError={isError} token={token} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default PasswordResetPage

export const metadata: Metadata = {
  title: `Password reset`,
  description: 'Reset your password',
  openGraph: {
    images: ['/auth-bg.png'],
    title: 'Reset your password',
    description: 'Reset your password',
    type: 'website',
    url: '/account/password-reset',
  },
}
