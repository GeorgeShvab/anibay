'use client'

import { Formik, FormikHelpers } from 'formik'
import { FC, useState } from 'react'
import * as yup from 'yup'
import Greeting from './Greeting'
import messages from '@/locales/messages'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useMutation from '@/hooks/useMutation'
import Fields from './Fields'

export interface Values {
  email: string
  password: string
}

const validationSchema = yup.object<Values>({
  email: yup.string().required(messages.INCORRECT_CREDENTIALS).email(messages.INCORRECT_CREDENTIALS),
  password: yup
    .string()
    .required(messages.INCORRECT_CREDENTIALS)
    .min(6, messages.INCORRECT_CREDENTIALS)
    .max(100, messages.INCORRECT_CREDENTIALS),
})

const initialValues: Values = {
  email: '',
  password: '',
}

export type Section = 'greeting' | 'fields'

const Form: FC = () => {
  const router = useRouter()

  const [section, setSection] = useState<Section>('greeting')

  const { mutateAsync, isLoading, isError } = useMutation(
    async (data: Values) => await signIn('credentials', { redirect: false, ...data })
  )

  const handleSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    const data = await mutateAsync(values)

    if (data?.status === 401) {
      helpers.setErrors({ email: messages.INCORRECT_CREDENTIALS, password: messages.INCORRECT_CREDENTIALS })
    } else if (data?.ok) {
      router.push('/')
    }
  }

  if (section === 'greeting') return <Greeting setSection={setSection} />

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={isError}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Fields setSection={setSection} isLoading={isLoading} {...props} />
          </form>
        )}
      </Formik>
    </>
  )
}

export default Form
