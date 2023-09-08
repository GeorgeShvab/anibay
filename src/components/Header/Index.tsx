import { FC } from 'react'
import Logo from '../Logo'
import HeaderAccount from './HeaderAccount'
import Nav from './Nav'

interface Props {
  page: string
}

const Header: FC<Props> = ({ page }) => {
  return (
    <header className="p-4 px-6 lg:px-10 md:py-6 w-100 absolute left-0 top-0 w-full z-30 hidden md:block">
      <div className="items-center gap-16 justify-center md:justify-between relative hidden md:flex">
        <div className="hidden md:block">
          <Logo className="!text-4xl" href="/" />
        </div>
        <Nav page={page} />
        <HeaderAccount />
      </div>
    </header>
  )
}

export const SimpleHeader: FC = () => {
  return (
    <header className="p-4 px-6 lg:px-10 lg:py-6 w-100 absolute left-0 top-0 w-full z-30 hidden md:block">
      <div className="flex items-center gap-16 justify-center">
        <div className="hidden md:block">
          <Logo />
        </div>
      </div>
    </header>
  )
}

export default Header
