'use client'

import { useState } from 'react'

interface RequestStatus {
  error: any
  data: any
  isSuccess: boolean
  isError: boolean
  isLoading: boolean
}

const useMutation = <TBody, TResponse>(fn: (arg: TBody) => TResponse) => {
  const [status, setStatus] = useState<RequestStatus>({
    error: null,
    data: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
  })

  const mutateAsync = async (data: TBody) => {
    try {
      setStatus((prev) => ({ ...prev, isLoading: true }))

      const response = await fn(data)

      setStatus({
        error: null,
        data: response,
        isSuccess: true,
        isError: false,
        isLoading: false,
      })

      return response
    } catch (e) {
      setStatus((prev) => ({ ...prev, error: e, isSuccess: false, isError: true, isLoading: false }))
      throw e
    }
  }

  return { mutateAsync, ...status }
}

export default useMutation
