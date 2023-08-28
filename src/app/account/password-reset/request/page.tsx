import Layout from '@/components/Layout'
import { FC } from 'react'
import { Metadata } from 'next'
import Form from './Form'

const ResetPasswordPage: FC = () => {
  return (
    <Layout simpleHeader>
      <main className="h-screen px-3 md:px-6 bg-auth">
        <div className="h-full flex items-center justify-center">
          <div className="max-w-[400px] w-full overflow-hidden rounded-[18px] bg-dark text-left align-middle shadow-2xl transition-all relative">
            <div className="py-10 px-10 md:px-16">
              <Form />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default ResetPasswordPage

export const metadata: Metadata = {
  title: `Request password reset`,
  description: 'Request password reset to gain access to your account',
  openGraph: {
    images: ['/auth-bg.png'],
    title: 'Request password reset to gain access to your account',
    description: 'Request password reset to gain access to your account',
    type: 'website',
    url: '/account/password-reset/request',
  },
}
