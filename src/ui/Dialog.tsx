import { FC, Fragment } from 'react'
import { Dialog as HeadlessUiDialog, Transition } from '@headlessui/react'
import { Severity } from '@/types'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  confirmText?: string
  denyText?: string
  onConfirm?: () => void
  onDeny?: () => void
  severity?: Severity
}

const Dialog: FC<Props> = ({ open, onClose, title, subtitle, confirmText, denyText, onConfirm, onDeny, severity }) => {
  const handleConfirm = () => {
    onConfirm && onConfirm()
    onClose()
  }

  const handleDeny = () => {
    onDeny && onDeny()
    onClose()
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessUiDialog as="div" className="relative z-10" onClose={onClose}>
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
              <HeadlessUiDialog.Panel className="w-[700px] p-4 transform overflow-hidden rounded-lg bg-dark text-left align-middle shadow-2xl transition-all">
                {title && (
                  <HeadlessUiDialog.Title className="text-white text-lg mb-2.5">{title}</HeadlessUiDialog.Title>
                )}
                {subtitle && (
                  <HeadlessUiDialog.Description className="text-neutral-300 mb-8 text-sm">
                    {subtitle}
                  </HeadlessUiDialog.Description>
                )}
                <div className="flex justify-between">
                  <button
                    onClick={handleDeny}
                    className="text-white bg-dark-light text-neutral-500 text-sm px-4 py-1.5 rounded"
                  >
                    {denyText || 'Cancel'}
                  </button>
                  <button
                    onClick={handleConfirm}
                    className={`text-white bg-dark-light text-neutral-500 text-sm px-4 py-1.5 rounded ${
                      severity === 'danger'
                        ? 'bg-red'
                        : severity === 'success'
                        ? 'bg-neutral-100 !text-black'
                        : 'bg-dark-light'
                    }`}
                  >
                    {confirmText || 'Confirm'}
                  </button>
                </div>
              </HeadlessUiDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessUiDialog>
    </Transition>
  )
}

export default Dialog
