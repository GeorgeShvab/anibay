import { FC, ForwardRefRenderFunction, HTMLAttributes, InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  name: string
  className?: string
  value: string
}

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = ({ error, name, className = '', ...props }, ref) => {
  return (
    <input
      className={`h-10 bg-black rounded w-full px-3 text-white text-sm outline-none outline-offset-0 focus:outline focus:outline-red focus:shadow-red ${
        error ? 'outline outline-red shadow-red' : ''
      } ${className}`}
      name={name}
      autoComplete="email"
      placeholder="Email"
      ref={ref}
      {...props}
    />
  )
}

export default forwardRef(Input)
