import { RadioGroupStars } from "@/components/shared/RatingComponent";
import { rateCustomRequestFactory } from "@/serviceFactory/rateCustomRequestFactory";
import { rateSummaryFactory } from "@/serviceFactory/rateSummaryFactory";
import { ScanningMode } from "@/types/ScanningMode";
import { SummaryMode } from "@/types/SummaryMode";
import { errorReporter } from "@/utility/error/reporter";
import { classNames } from "@/utility/misc/classNames";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  LinkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { Fragment, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ShareModal } from "../customRequest/components/shareModal";

interface P {
  customRequest: any;
  account?: any;
  refresh?: any;
  refreshCount?: number;
  showSharing?: boolean;
}

export default function CustomRequest(p: P) {
  const { customRequest, account, refresh, refreshCount, showSharing } = p;
  const { t } = useTranslation();

  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div id="custom-request-main" className="min-h-screen">
        <div className="xl:pr-96">
          {/* Main area */}
          <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
            {customRequest.mode === ScanningMode.PRIOR_TO_TRACKING_MODE &&
              JSON.stringify(customRequest.completionResponse, null, 2)}

            {customRequest.mode === ScanningMode.EACH_FILE_IN_CHUNKS &&
              customRequest?.completionResponse.map((i: any, idx: any) => {
                {
                  return (
                    <div key={idx}>
                      <h3 className="text-lg">
                        <b>{i.file}</b>
                      </h3>
                      <ul>
                        {i?.summary?.map((j: any, idx: any) => {
                          return (
                            <li key={idx} className="mt-2">
                              {i?.summary.length > 1 && `(Part ${j.chunk + 1})`}
                              <ReactMarkdown className="custom-request-markdown">
                                {j.chunkSummary}
                              </ReactMarkdown>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                }
              })}

            {customRequest.mode === ScanningMode.EACH_FILE_OVERALL && (
              <>
                {customRequest?.completionResponse.map((i: any, idx: any) => {
                  return (
                    <div key={i.file}>
                      <span>
                        <h3 className="text-lg">
                          <b>{i.file}</b>
                        </h3>
                      </span>
                      <ReactMarkdown className="custom-request-markdown">
                        {i.finalCompletionForFile}
                      </ReactMarkdown>
                      <br />
                    </div>
                  );
                })}
              </>
            )}

            {customRequest.mode === ScanningMode.OVERALL &&
              customRequest?.completionResponse.map((i: any, idx: any) => {
                return (
                  <div key={idx}>
                    {customRequest?.completionResponse.length > 1 &&
                      `(Part ${i.part + 1})`}
                    <ReactMarkdown className="custom-request-markdown">
                      {i.overallCompletion}
                    </ReactMarkdown>
                    <br />
                  </div>
                );
              })}

            {customRequest.mode === ScanningMode.EACH_FILE_PER_PAGE &&
              customRequest?.completionResponse.map((i: any, idx: any) => {
                {
                  return (
                    <div key={idx}>
                      <h3 className="text-lg">
                        <b>{i.file}</b>
                      </h3>
                      <ul>
                        {i?.completionsForTheParts?.map((j: any, idx: any) => {
                          return (
                            <li key={idx} className="mt-2">
                              {i?.completionsForTheParts.length > 1 &&
                                `(Page ${idx + 1})`}
                              <ReactMarkdown className="custom-request-markdown">
                                {j}
                              </ReactMarkdown>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>

      <div
        id="custom-request-aside"
        className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 pt-20 pb-6 sm:px-6 lg:px-8 xl:block bg-white"
      >
        <div className="mt-6">
          {showSharing && (
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_HOSTNAME}/dashboard/custom-request-result/share?custom-request-id=${customRequest.id}`
                  );
                }}
              >
                <LinkIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => {
                  setShareModalOpen(true);
                }}
              >
                <ShareIcon className="h-6 w-6" />
              </button>
              {/* <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center rounded-full bg-gray-100 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Redo
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Continue Prompting
                          </span>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> */}
            </div>
          )}

          <dl className="divide-y divide-gray-100 space-y-10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {/* {t("dashboard-page:summary-v2.prompt")} */}
                {t("dashboard-page:summary.requested")}:
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                {/* <ReactMarkdown>{summary?.prompt}</ReactMarkdown> */}
                {customRequest?.createdAt
                  ? `${new Date(customRequest.createdAt)}`
                  : t("dashboard-page:summary.time-requested-unknown")}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("dashboard-page:summary-v2.mode")}:
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                {customRequest?.mode}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Rating
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                <div className="flex items-end">
                  <RadioGroupStars
                    rating={get(customRequest, "Ratings.0.rating", null)}
                    maxRating={get(customRequest, "Ratings.0.maxRating", null)}
                    recordRating={async (rating: number, ratingMax: number) => {
                      try {
                        // prettier-ignore
                        const rateSummaryRequest = rateCustomRequestFactory(customRequest.id, rating, ratingMax);
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
            {customRequest.model && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("dashboard-page:summary-v2.model")}:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0 truncate">
                  {customRequest?.model}
                </dd>
              </div>
            )}

            {customRequest.prompt && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("dashboard-page:custom-request.prompt")}:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0 truncate">
                  {customRequest?.prompt}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <ShareModal
        account={account}
        refresh={refresh}
        refreshCount={refreshCount || 0}
        customRequest={customRequest}
        open={shareModalOpen}
        cb={(isOpen: boolean) => {
          setShareModalOpen(isOpen);
        }}
      />
    </div>
  );
}
