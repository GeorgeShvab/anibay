import Link from 'next/link'
import {
  ForwardRefRenderFunction,
  ReactElement,
  createElement,
  forwardRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'

type Props =
  | {
      children: ReactElement | string
      href?: string
      className?: string
      element?: keyof HTMLElementTagNameMap
      color?: 'black' | 'dark' | 'red' | 'dark-light'
    } & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)

const Button: ForwardRefRenderFunction<HTMLElement, Props> = (
  { children, href, className, color, element = 'button', ...attributes },
  ref
) => {
  let style = 'h-10 flex items-center justify-center rounded w-full transition-all disabled:opacity-50 px-4 '

  switch (color) {
    case 'black':
      style += 'bg-black text-white hover:bg-dark-dark disabled:hover:!bg-black'
      break
    case 'dark':
      style += 'bg-dark text-white hover:bg-dark-light disabled:hover:!bg-dark'
      break
    case 'dark-light':
      style += 'bg-dark-light text-white hover:bg-grey disabled:hover:!bg-dark-light'
      break
    default:
      style += 'bg-red text-white hover:bg-red-dark disabled:hover:!bg-red'
      break
  }

  if (href) {
    return (
      <Link href={href} ref={ref as any} className={`${style} ${className}`} {...(attributes as any)}>
        {children}
      </Link>
    )
  }

  return createElement(element, { ref, className: `${style} ${className}`, ...attributes }, children)
}

export default forwardRef(Button)
