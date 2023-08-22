'use client'

import { FC, MouseEvent, Fragment } from 'react'
import IconButton from '@/ui/IconButton'
import { Popover, Transition } from '@headlessui/react'
import { useState } from 'react'
import { usePopper } from 'react-popper'
import axios from '@/axios'
import AuthProtection from '@/components/AuthClickProtection'

const Rate: FC<{ id: string; userRating?: number }> = ({ id, userRating }) => {
  const [userScore, setUserScore] = useState<number | undefined>(userRating)

  const handleRate = async (e: MouseEvent) => {
    if (!e.currentTarget.parentNode) return

    const index = Array.from(e.currentTarget.parentNode?.children).reverse().indexOf(e.currentTarget) + 1

    setUserScore(index)

    await axios.post(`/api/anime/${id}/rate`, { score: index }).catch((e) => {})
  }

  return (
    <AuthProtection
      fallback={
        <IconButton color="dark" element="div" className="text-white">
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
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </IconButton>
      }
    >
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button className="outline-none">
              <IconButton color="dark" element="div" className={userRating ? '!text-red' : 'text-white'}>
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
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </IconButton>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bottom-0 right-[-52px]">
                <div className="rounded shadow h-10 px-2 pl-4 bg-dark-light flex items-center w-[calc(100vw-24px)] md:w-[300px]">
                  <p className="whitespace-nowrap mr-8 md:mr-3 !text-white text-sm">Your rating:</p>
                  <div className="flex items-center flex-1">
                    <div className="[&>:has(:hover)~*]:!text-red [&>:has(:hover)]:!text-red flex-row-reverse [&:has(:hover)>*]:!text-black flex items-center flex-1">
                      {new Array(5).fill(null).map((item, index) => (
                        <div
                          className={`hover:!text-red ${
                            (userScore || 0) <= Math.abs(index - 4) ? 'text-black' : 'text-red'
                          }`}
                          onClick={(e) => {
                            handleRate(e), close()
                          }}
                          key={index}
                        >
                          <div className="px-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 text-center">
                      <span className="text-white">{userScore || '-'}</span>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </AuthProtection>
  )
}

export default Rate
