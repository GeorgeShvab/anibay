import Link from 'next/link'
import {
  ForwardRefRenderFunction,
  ReactElement,
  createElement,
  forwardRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'
import CircleLoading from './CircleLoading'

type Props =
  | {
      children: ReactElement | string
      href?: string
      className?: string
      element?: keyof HTMLElementTagNameMap
      color?: 'black' | 'dark' | 'red'
      circleLoaderClassName?: string
      isLoading: boolean
    } & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)

const Button: ForwardRefRenderFunction<HTMLElement, Props> = (
  { children, href, className, color, isLoading, circleLoaderClassName, element = 'button', ...attributes },
  ref
) => {
  let style =
    'h-10 flex items-center justify-center rounded w-full transition-colors transition-opacity disabled:opacity-50 px-4 '

  switch (color) {
    case 'black':
      style += 'bg-black text-white hover:bg-dark-dark disabled:hover:!bg-black'
      break
    case 'dark':
      style += 'bg-dark text-white hover:bg-dark-light disabled:hover:!bg-dark'
      break
    default:
      style += 'bg-red text-white hover:bg-red-dark disabled:hover:!bg-red'
      break
  }

  if (href) {
    return (
      <Link href={href} ref={ref as any} className={`${style} ${className}`} {...(attributes as any)}>
        {isLoading ? <CircleLoading className={circleLoaderClassName} /> : children}
      </Link>
    )
  }

  return createElement(
    element,
    { ref, className: `${style} ${className}`, ...attributes },
    isLoading ? <CircleLoading className={circleLoaderClassName} /> : children
  )
}

export default forwardRef(Button)
