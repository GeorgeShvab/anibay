'use client'

import { useEffect, useState } from 'react'

interface RequestStatus {
  error: any
  data: any
  isSuccess: boolean
  isError: boolean
  isLoading: boolean
}

const useQuery = <TResponse>(fn: () => TResponse, invalidate: any[] = []) => {
  const [status, setStatus] = useState<RequestStatus>({
    error: null,
    data: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
  })

  useEffect(() => {
    ;(async () => {
      try {
        setStatus((prev) => ({ ...prev, isLoading: true }))

        const response = await fn()

        setStatus({
          error: null,
          data: response,
          isSuccess: true,
          isError: false,
          isLoading: false,
        })
      } catch (e) {
        setStatus((prev) => ({ ...prev, error: e, isSuccess: false, isError: true, isLoading: false }))
      }
    })()
  }, invalidate)

  return { ...status }
}

export default useQuery
