import { FormikProps } from 'formik'
import { FC } from 'react'
import { Section, Values } from './Form'
import Button from '@/ui/Button'
import Link from 'next/link'
import axios from '@/axios'
import useMutation from '@/hooks/useMutation'
import LoadingButton from '@/ui/LoadingButton'

interface Props extends FormikProps<Values> {
  setSection: (section: Section) => void
}

const FirstStep: FC<Props> = ({ values, errors, handleBlur, handleChange, touched, setSection, setErrors }) => {
  const { mutateAsync, isLoading } = useMutation(
    async (data) => (await axios.post('/api/user/signup/first-step', data)).data
  )

  const handleContinue = async () => {
    if ((touched.name && errors.name) || !values.name || (touched.username && errors.username) || !values.username) {
      return
    }

    try {
      await mutateAsync(values)

      setSection('second-step')
    } catch (e: any) {
      if (e?.response?.status === 400) {
        setErrors(e?.response?.data?.errors)
      }
    }
  }

  const isDisabled = !!(
    (touched.name && errors.name) ||
    !values.name ||
    (touched.username && errors.username) ||
    !values.username
  )

  return (
    <>
      <button
        type="button"
        className="absolute top-3 left-3 text-white rounded-full transition-colors p-2 hover:bg-black"
        onClick={() => setSection('greeting')}
        aria-label="Back"
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
        <h3 className="text-white text-3xl font-bold whitespace-nowrap text-center mb-3">Sign Up</h3>
        <p className="text-center text-neutral-300 text-sm">Enter your name and username</p>
      </div>
      <div className="">
        <fieldset className="mb-2">
          <input
            className={`h-10 bg-black rounded w-full mb-3 px-3 text-white text-sm outline-none outline-offset-0 focus:outline focus:outline-red focus:shadow-red ${
              errors.name && touched.name ? 'outline outline-red shadow-red' : ''
            }`}
            name="name"
            autoComplete="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            className={`h-10 bg-black rounded w-full px-3 text-white text-sm outline-none outline-offset-0 focus:outline focus:outline-red focus:shadow-red ${
              errors.username && touched.username ? 'outline outline-red shadow-red' : ''
            }`}
            name="username"
            autoComplete="nickname"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </fieldset>
        <p className="mb-3 text-red text-xs">
          {(touched.name && errors.name) || (touched.username && errors.username) || <>&nbsp;</>}
        </p>
        <div className="flex flex-col gap-4 mb-6">
          <LoadingButton isLoading={isLoading} type="button" onClick={handleContinue} disabled={isDisabled}>
            Continue
          </LoadingButton>
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

export default FirstStep
