'use client'

import axios from '@/axios'
import { Menu, Transition } from '@headlessui/react'
import { FC, useState, MouseEvent } from 'react'
import { usePopper } from 'react-popper'
import Dialog from '@/ui/Dialog'

interface Props {
  isAuthor: boolean
  id: number
  onDelete: () => void
}

const Dropdown: FC<Props> = ({ isAuthor, id, onDelete }) => {
  const [referenceElement, setReferenceElement] = useState()
  const [popperElement, setPopperElement] = useState()
  const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: 'left-start' })

  const [isDeletionDialogOpened, setIsDeletionDialogOpened] = useState<boolean>(false)

  const handleDelete = async () => {
    onDelete()
    await axios.delete(`/api/comment/${id}`)
  }

  return (
    <>
      <Dialog
        title="Delete comment?"
        subtitle="The comment and its replies will be deleted forever."
        severity="danger"
        open={isDeletionDialogOpened}
        onClose={() => setIsDeletionDialogOpened(false)}
        onConfirm={handleDelete}
      />

      <Menu>
        <Menu.Button
          ref={setReferenceElement as any}
          className="absolute right-[-4px] top-0 md:right-[-4px] md:top-0 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
          className="absolute"
        >
          <Menu.Items
            ref={setPopperElement as any}
            className="absolute rounded py-1.5 bg-black shadow flex flex-col"
            style={styles.popper}
            {...attributes.popper}
          >
            <Menu.Item>
              <button className="text-white text-sm tracking-wider py-1.5 px-5 hover:bg-dark-dark transition-colors whitespace-nowrap last:mb-0">
                Report comment
              </button>
            </Menu.Item>
            {isAuthor && (
              <>
                <Menu.Item>
                  <button
                    className="text-white text-sm tracking-wider py-1.5 px-5 hover:bg-dark-dark transition-colors whitespace-nowrap"
                    onClick={() => setIsDeletionDialogOpened(true)}
                  >
                    Delete comment
                  </button>
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default Dropdown
