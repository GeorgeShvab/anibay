import Link from 'next/link'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  ForwardRefRenderFunction,
  ReactElement,
  createElement,
  forwardRef,
} from 'react'

type Props = {
  color?: 'dark' | 'red' | 'black' | 'dark-light'
  href?: string
  children: ReactElement | string
  className?: string
  element?: keyof HTMLElementTagNameMap
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)

const IconButton: ForwardRefRenderFunction<HTMLElement, Props> = (
  { href, children, className, color, element = 'button', ...attributes },
  ref
) => {
  let style = 'h-10 w-10 flex items-center justify-center rounded transition-all disabled:opacity-75 '

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

  return createElement(element, { ref: ref, className: `${style} ${className}`, ...attributes }, children)
}

export default forwardRef(IconButton)
