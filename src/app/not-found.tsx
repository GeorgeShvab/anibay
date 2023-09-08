import Layout from '@/components/Layout'
import Logo from '@/components/Logo'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

const NotFound: FC = () => {
  return (
    <Layout>
      <main>
        <div className="md:pt-header">
          <div className="flex h-[var(--header-height)] flex items-center justify-center md:hidden">
            <Logo />
          </div>
          <div className="flex items-center justify-center h-screen md:h-[calc(100vh-calc(var(--header-height)+var(--footer-height)))]">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold tracking-wide text-red mb-6">404</h1>
              <p className="text-neutral-300 mb-1 md:mb-2 px-6">
                The page was not found. Ensure you provided a correct link.
              </p>
              <Link href="/" className="text-red text-sm">
                To home page
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default NotFound

export const metadata: Metadata = {
  title: `Page not found`,
  description: 'This page does not exist',
  openGraph: {
    images: ['/auth-bg.png'],
    title: 'Page not found',
    description: 'This page is not exist',
    type: 'website',
    url: '/',
  },
}
