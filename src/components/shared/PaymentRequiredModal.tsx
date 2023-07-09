import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {
  CreditCardIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface P {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function PaymentRequiredModal(p: P) {
  const { isOpen, setIsOpen } = p;
  const router = useRouter();

  return (
    <Transition.Root show={isOpen} as={Fragment} appear>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <div>
                <>
                  {/* <div className="relative">Paid feature</div> */}
                  <div className="flex justify-start border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                    <ShieldExclamationIcon
                      className="h-6 w-6 text-orange-600"
                      aria-hidden="true"
                    />
                    &nbsp;
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Paid feature
                    </h3>
                  </div>

                  <div className="flex divide-x divide-gray-100">
                    <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                      <div className="flex flex-auto flex-col justify-around p-6">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <CreditCardIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                          <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Credit card required
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              You are accessing one of Kalygo&apos;s paid
                              features. We offer several pricing plans including
                              a pay-per-use option and a monthly subscription.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            router.push("/dashboard/settings#payment-section");
                          }}
                          className="mt-6 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                    <div
                      className={classNames(
                        "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4"
                      )}
                    >
                      <div className="h-full flex flex-auto flex-col justify-around items-center p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                          Referral Program
                        </h3>
                        <h2 className="mb-4 mt-2 text-xs text-center text-gray-500">
                          Or share a Kalygo referral link with your friends to
                          win usage credits when they sign up with a paid
                          account
                        </h2>
                        <div className="-mx-2 text-sm text-gray-700">
                          <div
                            className={classNames(
                              "flex cursor-default select-none items-center rounded-md p-2"
                            )}
                          >
                            <div className="flex justify-center font-semibold items-center gap-6">
                              Coming Soon!
                              {/* <a
                                className="text-blue-600 hover:text-blue-700"
                                aria-label="Visit LinkedIn"
                                href=""
                                target="_blank"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  className="h-8"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                  ></path>
                                </svg>
                              </a>

                              <a
                                className="text-blue-600 hover:text-blue-700"
                                aria-label="Visit Facebook"
                                href=""
                                target="_blank"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 320 512"
                                  className="h-8"
                                >
                                  <path
                                    fill="currentColor"
                                    d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                  ></path>
                                </svg>
                              </a>
                              <a
                                className="text-blue-600 hover:text-blue-700"
                                aria-label="Visit Instagram"
                                href=""
                                target="_blank"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  className="h-8"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                  ></path>
                                </svg>
                              </a>
                              <a
                                className="text-blue-600 hover:text-blue-700"
                                aria-label="Visit Twitter"
                                href=""
                                target="_blank"
                              >
                                <svg
                                  className="h-8"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                  ></path>
                                </svg>
                              </a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
