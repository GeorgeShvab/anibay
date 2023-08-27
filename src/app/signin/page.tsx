import Head from 'next/head'
import Layout from '@/components/Layout'
import Form from './Form'
import { FC } from 'react'
import { Metadata } from 'next'

const Signin: FC = () => {
  return (
    <>
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
    </>
  )
}

export default Signin

export const metadata: Metadata = {
  title: `Signup`,
  description: 'Create account on Anibay',
  openGraph: {
    images: ['/auth-bg.png'],
    title: 'Create account on Anibay',
    description: 'Create account on Anibay',
    type: 'website',
    url: '/',
  },
}
