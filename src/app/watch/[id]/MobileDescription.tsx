'use client'

import { Disclosure, Transition } from '@headlessui/react'
import { FC } from 'react'

interface Props {
  description: string
}

const MobileDescription: FC<Props> = ({ description }) => {
  return (
    <Disclosure>
      {({ open, close }) => (
        <>
          <Disclosure.Button className="text-neutral-200 flex justify-between w-full items-center px-3 pr-4 h-10">
            <span>{open ? 'Hide description' : 'Show description'}</span>
            <span className="text-neutral-200">
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              )}
            </span>
          </Disclosure.Button>

          <Disclosure.Panel
            className="text-neutral-400 transition-all p-3 text-justify"
            dangerouslySetInnerHTML={{ __html: description }}
          ></Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default MobileDescription
