'use client';

import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'

interface ModalProps {
  title: string,
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50
        transition-opacity"/>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center 
          p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="duration-300 transform transition ease-out"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="duration-200 transform transition ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <Dialog.Panel className="relative transform overflow-hidden 
              rounded-lg bg-[#1A1B1F] px-4 pb-4 pt-5 text-left shadow-xl 
              transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className='flex justify-between'>
                  <p>{title}</p>
                  <div>
                    <button 
                      type="button"
                      className="rounded-md text-white transition
                      hover:scale-110"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <IoClose className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal;