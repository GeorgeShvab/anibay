'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

const Signin: FC<{ token: string }> = ({ token }) => {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const data = await signIn('email-verification', { token, redirect: false })

      if (data?.ok) {
        setTimeout(() => {
          router.push('/')
        }, 7500)
      }
    })()
  }, [])

  return null
}

export default Signin
