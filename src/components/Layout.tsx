import { FC, ReactElement } from 'react'
import Header, { SimpleHeader } from './Header/Index'
import Navigation from './Mobile/Navigation'
import LoadingBar from './LoadingBar'
import Footer from './Footer'
import { headers } from 'next/headers'

interface Props {
  children: ReactElement
  simpleHeader?: boolean
}

const Layout: FC<Props> = ({ children, simpleHeader = false }) => {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') || ''

  const page = pathname.split('/')[1] || 'home'

  return (
    <div className="relative font-rubik min-h-screen">
      <div className="absolute bg-black z-1- top-0 bottom-0 left-0 right-0" />
      {simpleHeader ? <SimpleHeader /> : <Header page={page} />}
      <Navigation page={page} />
      <LoadingBar className="fixed" />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
