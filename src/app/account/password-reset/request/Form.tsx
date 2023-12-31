'use client'

import messages from '@/locales/messages'
import Button from '@/ui/Button'
import LoadingButton from '@/ui/LoadingButton'
import axios from 'axios'
import { FormikHelpers, Formik } from 'formik'
import Link from 'next/link'
import { FC } from 'react'
import useMutation from '@/hooks/useMutation'
import * as yup from 'yup'

interface Values {
  email: string
}

const validationSchema = yup.object<Values>({
  email: yup.string().required(messages.EMAIL_IS_REQUIRED).email(messages.INVALID_EMAIL),
})

const initialValues: Values = {
  email: '',
}

const Form: FC = () => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    async (data) => await axios.post('/api/user/password-reset/request', data)
  )

  const handleSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      const data = await mutateAsync(values)
    } catch (e: any) {
      if (e?.response?.status === 404) {
        helpers.setErrors({ email: 'No account on Anibay is associated with the given email address' })
      } else if (e?.response?.status === 400) {
        helpers.setErrors(e.response.data.errors)
      }
    }
  }

  if (isSuccess)
    return (
      <>
        <div className="mb-16">
          <h3 className="text-white text-3xl font-bold whitespace-nowrap text-center mb-3">Email sent</h3>
          <p className="text-center text-neutral-300 text-sm">Check your email inbox to continue password reset</p>
        </div>
        <div className="">
          <div className="flex flex-col gap-4 mb-8">
            <Button href="/">To home page</Button>
          </div>
          <p className="text-neutral-400 text-center text-sm">&copy;2023 Anibay. All rights reserved.</p>
        </div>
      </>
    )
  else {
    return (
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-16">
              <h3 className="text-white text-3xl font-bold whitespace-nowrap text-center mb-3">Password reset</h3>
              <p className="text-center text-neutral-300 text-sm">
                Enter email address associated with the account you lost access to
              </p>
            </div>
            <div className="">
              <fieldset className="mb-2">
                <input
                  className={`h-10 bg-black rounded w-full px-3 text-white text-sm outline-none outline-offset-0 focus:outline focus:outline-red focus:shadow-red ${
                    errors.email && touched.email ? 'outline outline-red shadow-red' : ''
                  }`}
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </fieldset>
              <p className="mb-3 text-red text-xs">{(touched.email && errors.email) || <>&nbsp;</>}</p>
              <div className="flex flex-col gap-4 mb-8">
                <LoadingButton
                  type="submit"
                  isLoading={isLoading}
                  disabled={!!((touched.email && errors.email) || !values.email)}
                >
                  Continue
                </LoadingButton>
              </div>
              <p className="text-neutral-400 text-center text-sm">
                To home{' '}
                <Link href="/" className="text-red underline">
                  page
                </Link>
              </p>
            </div>
          </form>
        )}
      </Formik>
    )
  }
}

export default Form
