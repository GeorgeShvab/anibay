import { FormikProps } from 'formik'
import { FC } from 'react'
import { Section, Values } from './Form'
import LoadingButton from '@/ui/LoadingButton'
import Link from 'next/link'

interface Props extends FormikProps<Values> {
  isLoading: boolean
  setSection: (section: Section) => void
}

const Fields: FC<Props> = ({ values, errors, touched, handleBlur, handleChange, isLoading, setSection }) => {
  return (
    <>
      <button
        type="button"
        className="absolute top-3 left-3 text-white rounded-full transition-colors p-2 hover:bg-black"
        onClick={() => setSection('greeting')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
      </button>
      <div className="mb-12">
        <h3 className="text-white text-3xl font-bold whitespace-nowrap text-center mb-3">Sign In</h3>
        <p className="text-center text-neutral-300 text-sm">Sign in with email and password</p>
      </div>
      <div className="">
        <fieldset className="mb-2">
          <input
            className={`h-10 bg-black rounded w-full mb-3 px-3 text-white text-sm outline-none outline-offset-0 focus:outline focus:outline-red focus:shadow-red ${
              errors.email && touched.email ? 'outline outline-red shadow-red' : ''
            }`}
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            className={`h-10 bg-black rounded w-full px-3 text-white text-sm outline-none outline-offset-0 focus:outline focus:outline-red focus:shadow-red ${
              errors.password && touched.password ? 'outline outline-red shadow-red' : ''
            }`}
            name="password"
            autoComplete="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </fieldset>
        <p className="mb-3 text-red text-xs">
          {(touched.email && errors.email) || (touched.password && errors.password) || <>&nbsp;</>}
        </p>
        <div className="flex flex-col gap-4 mb-6">
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            disabled={
              !!(
                (touched.email && errors.email) ||
                !values.email ||
                (touched.password && errors.password) ||
                !values.password
              )
            }
          >
            Log in
          </LoadingButton>
        </div>
        <p className="text-neutral-400 text-center text-sm">
          Do not have an account yet?{' '}
          <Link href="/signup" className="text-red underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  )
}

export default Fields
