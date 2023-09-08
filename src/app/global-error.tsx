'use client'

import Layout from '@/components/Layout'
import Logo from '@/components/Logo'
import Button from '@/ui/Button'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  error: unknown
  reset: () => void
}

const GlobalError: FC<Props> = ({ error, reset }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Rubik:wght@400;600;800&family=Ysabeau:wght@200&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="icon" type="image/svg" href="/favicon.svg" />
        <meta name="theme-color" content="#060606" />
      </head>
      <body>
        <main className="h-screen bg-black">
          <div className="">
            <div className="flex h-[var(--header-height)] flex items-center justify-center">
              <Logo href="/" />
            </div>
            <div className="flex items-center justify-center h-screen md:h-[calc(100vh-calc(var(--header-height)+var(--footer-height)))]">
              <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-bold tracking-wide text-red mb-6">Error</h1>
                <p className="text-neutral-300 px-6 mb-16 text-sm">
                  Unknow error occured. Reload the page by clicking the button below
                </p>
                <Button onClick={reset} className="mb-4 !w-fit mx-auto">
                  Reload page
                </Button>
                <Link href="/" className="text-red text-sm">
                  To home page
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}

export default GlobalError

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
