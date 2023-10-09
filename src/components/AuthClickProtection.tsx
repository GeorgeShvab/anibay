'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { FC, ReactElement, useState, Fragment, MouseEvent, cloneElement } from 'react'
import image from '@/assets/auth-image.png'
import Image from 'next/image'
import Button from '@/ui/Button'

interface Props {
  element?: keyof HTMLElementTagNameMap
  children: ReactElement
  fallback?: ReactElement | string
  className?: string
}

const AuthClickProtection: FC<Props> = ({ element = 'div', children, fallback, className }) => {
  const user = useSession()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClick = (e: MouseEvent) => {
    if ((user.status === 'authenticated' || !fallback) && typeof children !== 'string') {
      children.props.onClick && children.props.onClick(e)
    } else if (typeof fallback !== 'string') {
      fallback?.props.onClick && fallback?.props.onClick(e)
    }

    if (user.status === 'unauthenticated') {
      setIsOpen(true)
    }
  }

  return (
    <>
      {user.status === 'authenticated' || !fallback
        ? cloneElement(children, {
            ...children.props,
            onClick: handleClick,
            children: children.props.children,
          })
        : cloneElement(typeof fallback === 'string' ? <>{fallback}</> : fallback, {
            ...(typeof fallback === 'string' ? {} : fallback.props),
            onClick: handleClick,
            children: typeof fallback === 'string' ? null : fallback.props.children,
          })}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[700px] transform overflow-hidden rounded-[18px] bg-dark text-left align-middle shadow-2xl transition-all">
                  <div className="flex">
                    <div className="flex-[0_0_100%] md:flex-[0_0_55%] py-8 px-10 flex flex-col gap-16 md:gap-20 justify-between">
                      <div>
                        <h3 className="text-white text-3xl font-bold whitespace-nowrap text-center mb-3">
                          Welcome to <span className="text-red">Anibay</span>
                        </h3>
                        <p className="text-center text-neutral-300">Sign in or create new account</p>
                      </div>
                      <div className="flex flex-col justify-between gap-8 md:gap-12">
                        <div className="flex flex-col gap-4">
                          <Button href="/signup">Create Account</Button>
                          <Button href="/signin" color="dark-light">
                            Sign in
                          </Button>
                        </div>
                        <p className="text-neutral-400 text-center text-sm">&copy;2023 Anibay. All rights reserved.</p>
                      </div>
                    </div>
                    <div className="flex-[0_0_45%] p-3 pl-0 hidden md:block">
                      <img src={image} alt="Best anime in one click" className="w-full object-cover rounded-xl" />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AuthClickProtection
