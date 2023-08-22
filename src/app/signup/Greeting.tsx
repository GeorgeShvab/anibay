import Button from '@/ui/Button'
import Link from 'next/link'
import { Section } from './Form'
import { FC } from 'react'
import { signIn } from 'next-auth/react'

interface Props {
  setSection: (section: Section) => void
}

const Greeting: FC<Props> = ({ setSection }) => {
  const handleGoogleAuth = async () => {
    const data = await signIn('google')
  }

  return (
    <>
      <div className="mb-16">
        <h3 className="text-white text-3xl font-bold whitespace-nowrap text-center mb-3">Sign up</h3>
        <p className="text-center text-neutral-300 text-sm">Sign up with email or Google</p>
      </div>
      <div className="">
        <div className="flex flex-col gap-4 mb-8">
          <Button onClick={() => setSection('first-step')}>Continue with email</Button>
          <Button onClick={handleGoogleAuth} color="dark-light">
            <span className="flex gap-3 items-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 01-5.279-5.28 5.27 5.27 0 015.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 00-8.934 8.934 8.907 8.907 0 008.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
              </svg>
              <span> Continue with Google</span>
            </span>
          </Button>
        </div>
        <p className="text-neutral-400 text-center text-sm">
          Already have an account?{' '}
          <Link href="/signin" className="text-red underline">
            Sign in
          </Link>
        </p>
      </div>
    </>
  )
}

export default Greeting
