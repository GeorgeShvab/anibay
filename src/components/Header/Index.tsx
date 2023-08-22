import { FC } from 'react'
import Logo from '../Logo'
import Nav from './Nav'

const Header: FC = () => {
  return (
    <header className="p-4 px-6 lg:px-10 lg:py-6 w-100 absolute left-0 top-0 w-full z-30">
      <div className="flex items-center gap-16 justify-center md:justify-between">
        <div className="hidden md:block">
          <Logo />
        </div>
        <Nav />
      </div>
    </header>
  )
}

export const SimpleHeader: FC = () => {
  return (
    <header className="p-4 px-6 lg:px-10 lg:py-6 w-100 absolute left-0 top-0 w-full z-30">
      <div className="flex items-center gap-16 justify-center">
        <div className="hidden md:block">
          <Logo />
        </div>
      </div>
    </header>
  )
}

export default Header
