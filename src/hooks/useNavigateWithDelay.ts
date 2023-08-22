'use client'

import { useRouter } from 'next/navigation'

const useNavigateWithDelay = (href: string, delay: number) => {
  const router = useRouter()

  return () => {
    setTimeout(() => {
      router.push(href)
    }, delay)
  }
}

export default useNavigateWithDelay
