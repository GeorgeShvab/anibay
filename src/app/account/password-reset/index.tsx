import Layout from '@/components/Layout'
import Button from '@/ui/Button'
import TokenService from '@/services/TokenService'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { FC } from 'react'
import { Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import messages from '@/locales/messages'
import Link from 'next/link'
import axios from '@/axios'
import useMutation from '@/hooks/useMutation'
import LoadingButton from '@/ui/LoadingButton'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = context.query.token

  if (!token) {
    context.res.statusCode = 400

    return {
      props: {
        error: true,
      },
    }
  }

  try {
    await TokenService.validateToken(token as string)
  } catch (e) {
    context.res.statusCode = 400

    return {
      props: {
        tokenError: true,
      },
    }
  }

  return {
    props: {
      tokenError: false,
      token,
    },
  }
}

interface Props {
  tokenError: boolean
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

const PasswordResetPage: FC<Props> = ({ token, tokenError }) => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    async (data) => await axios.post('/api/user/password-reset', data)
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

  return (
    <>
      <Head>
        <title>Password reset</title>
        <meta name="description" content="AniBay - watch world's best anime" />
      </Head>
      <Layout simpleHeader>
        <main className="h-screen px-3 md:px-6 bg-auth">
          <div className="h-full flex items-center justify-center">
            <div className="max-w-[400px] w-full overflow-hidden rounded-[18px] bg-dark text-left align-middle shadow-2xl transition-all relative">
              <div className="py-10 px-10 md:px-16">
                {isSuccess ? (
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
                ) : tokenError ? (
                  <>
                    <div className="mb-16">
                      <h3 className="text-white text-[26px] md:text-[28px] font-bold whitespace-nowrap text-center mb-3">
                        Error
                      </h3>
                      <p className="text-center text-neutral-300 text-sm">
                        Verification link expired or link is invalid
                      </p>
                    </div>
                    <div className="">
                      <div className="flex flex-col gap-4 mb-8">
                        <Button href="/">To home page</Button>
                      </div>
                      <p className="text-neutral-400 text-center text-sm">&copy;2023 Anibay. All rights reserved.</p>
                    </div>
                  </>
                ) : (
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
                          <p className="mb-3 text-red text-xs">
                            {(touched.password && errors.password) || <>&nbsp;</>}
                          </p>
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
                )}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default PasswordResetPage
