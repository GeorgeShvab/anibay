'use client'

import { Formik, FormikHelpers } from 'formik'
import { FC, useState } from 'react'
import * as yup from 'yup'
import FirstStep from './FirstStep'
import Greeting from './Greeting'
import messages from '@/locales/messages'
import SecondStep from './SecondStep'
import useMutation from '@/hooks/useMutation'
import axios from '@/axios'
import Finish from './Finish'

export interface Values {
  name: string
  username: string
  email: string
  password: string
}

const validationSchema = yup.object<Values>({
  name: yup
    .string()
    .required(messages.NAME_IS_REQUIRED)
    .min(2, messages.INVALID_NAME_MIN_LENGTH)
    .max(30, messages.INVALID_NAME_MAX_LENGTH),
  username: yup
    .string()
    .required(messages.USERNAME_IS_REQUIRED)
    .min(2, messages.INVALID_USERNAME_MIN_LENGTH)
    .max(30, messages.INVALID_USERNAME_MAX_LENGTH),
  email: yup.string().required(messages.EMAIL_IS_REQUIRED).email(messages.INVALID_EMAIL),
  password: yup
    .string()
    .required(messages.PASSWORD_IS_REQUIRED)
    .min(6, messages.INVALID_PASSWORD_MIN_LENGTH)
    .max(100, messages.INVALID_PASSWORD_MAX_LENGTH),
})

const initialValues: Values = {
  name: '',
  username: '',
  email: '',
  password: '',
}

export type Section = 'greeting' | 'first-step' | 'second-step' | 'finish'

const Form: FC = () => {
  const [section, setSection] = useState<Section>('greeting')

  const { mutateAsync, isLoading } = useMutation(
    async (data: Values) => (await axios.post('/api/user/signup', data)).data
  )

  const handleSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await mutateAsync(values)

      setSection('finish')
    } catch (e: any) {
      if (e?.response?.status === 400) {
        helpers.setErrors(e.response?.data?.errors)
      }
    }
  }

  if (section === 'greeting') return <Greeting setSection={setSection} />
  if (section === 'finish') return <Finish />

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {section === 'first-step' ? (
            <FirstStep setSection={setSection} {...props} />
          ) : (
            <SecondStep isLoading={isLoading} setSection={setSection} {...props} />
          )}
        </form>
      )}
    </Formik>
  )
}

export default Form
