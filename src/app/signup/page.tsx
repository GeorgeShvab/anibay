import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { FC } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import Form from './Form'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

const Signin: FC = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="AniBay - watch world's best anime" />
      </Head>
      <Layout simpleHeader blackFooter>
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
