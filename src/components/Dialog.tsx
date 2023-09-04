'use client'

import { FC, Fragment, useEffect } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import Button from '@/ui/Button'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  onDeny?: () => void
  title: string
  text?: string
  severity?: 'success' | 'danger' | 'neutral'
  denyText?: string
  confirmText?: string
}

const Dialog: FC<Props> = ({
  open,
  onClose,
  onConfirm,
  onDeny,
  title,
  text,
  severity = 'neutral',
  denyText = 'Cancel',
  confirmText = 'Confirm',
}) => {
  useEffect(() => {
    console.log(open)
  }, [open])

  const handleConfirm = () => {
    onClose()
    console.log('dfsdf')
    onConfirm && onConfirm()
  }

  const handleDeny = () => {
    onClose()
    onDeny && onDeny()
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={onClose}>
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
              <HeadlessDialog.Panel className="w-[95vw] md:w-[500px] transform overflow-hidden rounded-[18px] bg-black text-left align-middle shadow-2xl transition-all py-6 px-8 md:py-8 md:px-10">
                <h3 className="text-white text-lg mb-4 font-semibold">{title}</h3>
                <p className="text-neutral-300 mb-8 text-sm">{text}</p>
                <div className="flex justify-between">
                  <Button color="dark" className="!w-fit" onClick={handleDeny}>
                    {denyText}
                  </Button>
                  <Button color={severity === 'danger' ? 'red' : 'dark'} className="!w-fit" onClick={handleConfirm}>
                    {confirmText}
                  </Button>
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}

export default Dialog
