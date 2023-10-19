import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import { RadioGroupStars } from "@/components/shared/RatingComponent";
import get from "lodash.get";
import { rateCustomRequestFactory } from "@/serviceFactory/rateCustomRequestFactory";
import { errorReporter } from "@/utility/error/reporter";
import { rateSummaryFactory } from "@/serviceFactory/rateSummaryFactory";
import { useRouter } from "next/router";

interface P {
  showOpen: boolean;
  setShowOpen: Dispatch<SetStateAction<boolean>>;
  summary: any;
}

export function SlideOver(p: P) {
  const { showOpen, setShowOpen, summary } = p;

  const { t } = useTranslation();
  const router = useRouter();

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
                          Summary
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
                        <p className="text-sm text-white">{summary.mode}</p>
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
                            {summary?.createdAt
                              ? `${new Date(summary.createdAt)}`
                              : t(
                                  "dashboard-page:summary.time-requested-unknown"
                                )}
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            {t("dashboard-page:summary-v3.mode")}
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                            {summary?.mode}
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Rating
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                            <div className="flex items-end">
                              <RadioGroupStars
                                rating={get(summary, "Ratings.0.rating", null)}
                                maxRating={get(
                                  summary,
                                  "Ratings.0.maxRating",
                                  null
                                )}
                                recordRating={async (
                                  rating: number,
                                  ratingMax: number
                                ) => {
                                  try {
                                    // prettier-ignore
                                    const rateSummaryRequest = rateSummaryFactory(summary.id, rating, ratingMax);
                                    // prettier-ignore
                                    const rateSummaryResponse = await rateSummaryRequest;
                                    // prettier-ignore
                                    console.log("rateSummaryResponse", rateSummaryResponse);
                                  } catch (e) {
                                    errorReporter(e);
                                  }
                                }}
                              />
                            </div>
                          </dd>
                        </div>
                        {summary.model && (
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {t("dashboard-page:summary-v3.model")}
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0 truncate">
                              {summary?.model}
                            </dd>
                          </div>
                        )}

                        {summary.prompt && (
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {t("dashboard-page:summary-v3.prompt")}
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0 truncate">
                              {summary?.prompt}
                            </dd>
                          </div>
                        )}

                        {summary.batchId && (
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {t("dashboard-page:summary-v3.batch-id")}
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                              {summary?.batchId}&nbsp;
                              <button
                                onClick={() => {
                                  router.push(
                                    `/dashboard/batch?batch-id=${summary?.batchId}`
                                  );
                                }}
                                className="mt-1 p-0.5 text-sm leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
                              >
                                {t("dashboard-page:summary-v3.view-batch")}
                              </button>
                            </dd>
                          </div>
                        )}
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
