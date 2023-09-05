import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment, ReactElement, useState } from 'react'
import { usePopper } from 'react-popper'

interface Props {
  className?: string
  children: ReactElement
  data: ReactElement[]
  btnWrapperClassName?: string
}

const Dropdown: FC<Props> = ({ data, children, className, btnWrapperClassName }) => {
  const [referenceElement, setReferenceElement] = useState()
  const [popperElement, setPopperElement] = useState()
  const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: 'bottom-end' })

  return (
    <Menu>
      <Menu.Button ref={setReferenceElement as any} as="div" className={btnWrapperClassName}>
        {children}
      </Menu.Button>
      <Transition
        enter="transition-opacity duration-100 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={Fragment}
      >
        <Menu.Items
          ref={setPopperElement as any}
          className={`absolute z-30 rounded-lg bg-dark-dark shadow flex flex-col overflow-hidden ${className}`}
          style={styles.popper}
          {...attributes.popper}
        >
          {data.map((item, index) => (
            <Menu.Item key={index}>{item}</Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
