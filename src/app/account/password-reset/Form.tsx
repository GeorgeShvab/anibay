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

interface Props {
  isError: boolean
  token: string
}

interface Values {
  password: string
}

const validationSchema = yup.object<Values>({
  password: yup
    .string()
    .required(messages.PASSWORD_IS_REQUIRED)
    .min(6, messages.INVALID_PASSWORD_MIN_LENGTH)
    .max(100, messages.INVALID_PASSWORD_MAX_LENGTH),
})

const initialValues: Values = {
  password: '',
}

const Form: FC<Props> = ({ isError, token }) => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    async (data: Values & { token: string }) => await axios.post('/api/user/password-reset', data)
  )

  const handleSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      if (!token) return null

      const data = await mutateAsync({ ...values, token })
    } catch (e: any) {
      if (e?.response?.status === 400) {
        helpers.setErrors(e.response.data.errors)
      }
    }
  }

  if (isSuccess) {
    return (
      <>
        <div className="mb-16">
          <h3 className="text-white text-[26px] md:text-[28px] font-bold whitespace-nowrap text-center mb-3">
            Reset completed
          </h3>
          <p className="text-center text-neutral-300 text-sm">New password has been set</p>
        </div>
        <div className="">
          <div className="flex flex-col gap-4 mb-8">
            <Button href="/signin">To sign in page</Button>
          </div>
          <p className="text-neutral-400 text-center text-sm">&copy;2023 Anibay. All rights reserved.</p>
        </div>
      </>
    )
  } else if (isError) {
    return (
      <>
        <div className="mb-16">
          <h3 className="text-white text-[26px] md:text-[28px] font-bold whitespace-nowrap text-center mb-3">Error</h3>
          <p className="text-center text-neutral-300 text-sm">Verification link expired or link is invalid</p>
        </div>
        <div className="">
          <div className="flex flex-col gap-4 mb-8">
            <Button href="/">To home page</Button>
          </div>
          <p className="text-neutral-400 text-center text-sm">&copy;2023 Anibay. All rights reserved.</p>
        </div>
      </>
    )
  } else {
    return (
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-16">
              <h3 className="text-white text-[26px] md:text-[28px] font-bold whitespace-nowrap text-center mb-3">
                Password reset
              </h3>
              <p className="text-center text-neutral-300 text-sm">Enter new strong password</p>
            </div>
            <div className="">
              <fieldset className="mb-2">
                <input
                  className={`h-10 bg-black rounded w-full px-3 text-white text-sm outline-none outline-offset-0 focus:outline focus:outline-red focus:shadow-red ${
                    errors.password && touched.password ? 'outline outline-red shadow-red' : ''
                  }`}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </fieldset>
              <p className="mb-3 text-red text-xs">{(touched.password && errors.password) || <>&nbsp;</>}</p>
              <div className="flex flex-col gap-4 mb-8">
                <LoadingButton
                  type="submit"
                  isLoading={isLoading}
                  disabled={!!((touched.password && errors.password) || !values.password)}
                >
                  Set new password
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
