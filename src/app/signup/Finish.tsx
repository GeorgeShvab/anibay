import Button from '@/ui/Button'
import { FC } from 'react'

const Finish: FC = () => {
  return (
    <>
      <div className="mb-16">
        <h3 className="text-white text-3xl font-bold whitespace-nowrap text-center mb-3">Account created</h3>
        <p className="text-center text-neutral-300 text-sm">Check your email inbox to end registration</p>
      </div>
      <div className="">
        <div className="flex flex-col gap-4 mb-8">
          <Button href="/">To home page</Button>
        </div>
        <p className="text-neutral-400 text-center text-sm">&copy;2023 Anibay. All rights reserved.</p>
      </div>
    </>
  )
}

export default Finish
