import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import { RadioGroupStars } from "@/components/shared/RatingComponent";
import get from "lodash.get";
import { rateCustomRequestFactory } from "@/serviceFactory/rateCustomRequestFactory";
import { errorReporter } from "@/utility/error/reporter";
import { ratePromptFactory } from "@/serviceFactory/ratePromptFactory";

interface P {
  showOpen: boolean;
  setShowOpen: Dispatch<SetStateAction<boolean>>;
  prompt: any;
}

export function SlideOver(p: P) {
  const { showOpen, setShowOpen, prompt } = p;

  const { t } = useTranslation();

  return (
    <Transition.Root show={showOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
                    <div className="bg-blue-600 px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-white">
                          Prompt
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-blue-600 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setShowOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-white">{prompt.mode}</p>
                      </div>
                    </div>
                    <div className="relative flex-1 px-4 py-6 sm:px-6">
                      {/* Your content */}
                      <dl className="divide-y divide-gray-100 space-y-10">
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            {t("dashboard-page:summary.requested")}
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                            {prompt?.createdAt
                              ? `${new Date(prompt.createdAt)}`
                              : t(
                                  "dashboard-page:summary.time-requested-unknown"
                                )}
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Rating
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                            <div className="flex items-end">
                              <RadioGroupStars
                                rating={get(prompt, "Ratings.0.rating", null)}
                                maxRating={get(
                                  prompt,
                                  "Ratings.0.maxRating",
                                  null
                                )}
                                recordRating={async (
                                  rating: number,
                                  ratingMax: number
                                ) => {
                                  try {
                                    // prettier-ignore
                                    const ratePromptRequest = ratePromptFactory(prompt.id, rating, ratingMax);
                                    // prettier-ignore
                                    const ratePromptResponse = await ratePromptRequest;
                                    // prettier-ignore
                                    console.log("ratePromptResponse", ratePromptResponse);
                                  } catch (e) {
                                    errorReporter(e);
                                  }
                                }}
                              />
                            </div>
                          </dd>
                        </div>
                        {/* {prompt.model && (
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {t("dashboard-page:summary-v2.model")}
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0 truncate">
                              {prompt?.model}
                            </dd>
                          </div>
                        )} */}

                        {/* {prompt.prompt && (
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {t("dashboard-page:custom-request.prompt")}
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0 truncate">
                              {prompt?.prompt}
                            </dd>
                          </div>
                        )} */}
                      </dl>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
