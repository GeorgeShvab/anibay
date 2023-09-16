import { Formik, FormikHelpers } from 'formik'
import { FC } from 'react'
import * as yup from 'yup'
import messages from '@/locales/messages'
import Input from '@/ui/Input/Input'
import Button from '@/ui/Button'
import LoadingButton from '@/ui/LoadingButton'
import axios from '@/axios'
import { useMutation } from 'react-query'
import { useSession } from 'next-auth/react'

interface Values {
  name: string
  username: string
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
})

const NameForm: FC = () => {
  const { data, update } = useSession()

  const { mutateAsync, isLoading } = useMutation(
    async (data: Values) => await axios.patch('/api/user/update/name', data)
  )

  const handleSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await mutateAsync(values)

      await update()
    } catch (e: any) {
      if (e?.response?.status === 400) {
        helpers.setErrors(e.response?.data?.errors)
      }
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ name: data?.user.name as string, username: data?.user.username as string }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <h4 className="mb-4 text-white">Change name</h4>
          <fieldset className="mb-2 block">
            <Input
              name="name"
              value={values.name}
              error={!!(errors.name && touched.name)}
              placeholder="Name"
              autoComplete="name"
              className="mb-3"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="username"
              value={values.username}
              error={!!(errors.username && touched.username)}
              placeholder="Name"
              autoComplete="nickname"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </fieldset>
          <p className="mb-3 text-red text-xs">
            {(touched.name && errors.name) || (touched.username && errors.username) || <>&nbsp;</>}
          </p>
          <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
        </form>
      )}
    </Formik>
  )
}

export default NameForm
