import { Formik, FormikHelpers } from 'formik'
import { FC } from 'react'
import * as yup from 'yup'
import messages from '@/locales/messages'
import Input from '@/ui/Input/Input'
import Button from '@/ui/Button'
import { FileChangeInfo } from 'fs/promises'
import LoadingButton from '@/ui/LoadingButton'
import { useMutation } from 'react-query'
import axios from '@/axios'

interface Values {
  password: string
  oldPassword: string
}

const validationSchema = yup.object<Values>({
  password: yup
    .string()
    .required(messages.PASSWORD_IS_REQUIRED)
    .min(6, messages.INVALID_PASSWORD_MIN_LENGTH)
    .max(100, messages.INVALID_PASSWORD_MAX_LENGTH),
  oldPassword: yup
    .string()
    .required(messages.INCORRECT_OLD_PASSWORD)
    .min(6, messages.INCORRECT_OLD_PASSWORD)
    .max(100, messages.INCORRECT_OLD_PASSWORD),
})

const PasswordForm: FC = () => {
  const { mutateAsync, isLoading } = useMutation(
    async (data: Values) => await axios.patch('/api/user/update/name', data)
  )

  const handleSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await mutateAsync(values)
    } catch (e: any) {
      if (e?.response?.status === 400) {
        console.log(e)
        helpers.setErrors(e.response?.data?.errors)
      }
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        password: '',
        oldPassword: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <h4 className="mb-4 text-white">Change password</h4>
          <fieldset className="mb-2 block">
            <Input
              name="oldPassword"
              value={values.oldPassword}
              error={!!(errors.oldPassword && touched.oldPassword)}
              placeholder="Old Password"
              autoComplete="password"
              className="mb-3"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="password"
              value={values.password}
              error={!!(errors.password && touched.password)}
              placeholder="Password"
              autoComplete="new-password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </fieldset>
          <p className="mb-3 text-red text-xs">
            {(touched.password && errors.password) || (touched.oldPassword && errors.oldPassword) || <>&nbsp;</>}
          </p>
          <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
        </form>
      )}
    </Formik>
  )
}

export default PasswordForm
