import { FC, FunctionComponent, ReactElement } from 'react'
import Header, { SimpleHeader } from './Header/Index'
import Navigation from './Mobile/Navigation'
import LoadingBar from './LoadingBar'
import Footer from './Footer'
import { Session } from 'next-auth'

interface Props {
  children: ReactElement
  simpleHeader?: boolean
  blackFooter?: boolean
}

const Layout: FunctionComponent<Props> = ({ children, blackFooter = false, simpleHeader = false }) => {
  return (
    <div className="relative font-rubik min-h-screen">
      <div className="absolute bg-black z-1- top-0 bottom-0 left-0 right-0" />
      {simpleHeader ? <SimpleHeader /> : <Header />}
      <Navigation />
      <LoadingBar className="fixed" />
      {children}
      <Footer black={blackFooter} />
    </div>
  )
}

export default Layout
