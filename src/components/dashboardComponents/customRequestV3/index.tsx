import { RadioGroupStars } from "@/components/shared/RatingComponent";
import { rateCustomRequestV3Factory } from "@/serviceFactory/rateCustomRequestV3Factory";
import { ScanningMode } from "@/types/ScanningMode";
import { errorReporter } from "@/utility/error/reporter";
import { Bars3Icon, LinkIcon, ShareIcon } from "@heroicons/react/24/outline";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ShareModal } from "../customRequestV3/components/shareModal";
import { SlideOver } from "./components/slideOver";

interface P {
  customRequest: any;
  account?: any;
  refresh?: any;
  refreshCount?: number;
  showSharing?: boolean;
}

export default function CustomRequestV3(p: P) {
  const { customRequest, account, refresh, refreshCount, showSharing } = p;
  const { t } = useTranslation();

  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  return (
    <div className="xl:mr-96">
      {/* Main area */}
      <div className="w-full flex justify-between fixed bg-white lg:pr-[calc(18rem)] xl:pr-[calc(42rem)] shadow-sm">
        <h3 className="p-4 text-3xl font-bold text-gray-900 whitespace-nowrap truncate">
          {customRequest?.prompt}
        </h3>
        {showSharing && (
          <div className="flex mr-4 xl:hidden">
            <button
              onClick={() => {
                setSlideOverOpen(true);
              }}
            >
              <Bars3Icon className="h-8 w-8" />
            </button>
          </div>
        )}
        {/* <div className="m-4 relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-100" />
            </div>
          </div> */}
      </div>
      <div className="px-4 pt-[calc(6.25rem)] text-sm leading-6 text-gray-700 overflow-x-scroll min-h-screen">
        {customRequest.scanMode === ScanningMode.PRIOR_TO_TRACKING_MODE &&
          JSON.stringify(customRequest.completionResponse, null, 2)}

        {customRequest.scanMode === ScanningMode.FILE_IN_CHUNKS && (
          <div>
            <h3 className="text-lg">
              <b>{customRequest?.completionResponse?.file}</b>
            </h3>
            <ul>
              {customRequest?.completionResponse?.completions?.map(
                (j: any, idx: any) => {
                  return (
                    <li key={idx} className="mt-2">
                      {customRequest?.completionResponse?.completions.length >
                        1 && `(Part ${j.chunk + 1})`}
                      <ReactMarkdown className="custom-request-v3-markdown">
                        {j.completion}
                      </ReactMarkdown>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        )}

        {customRequest.scanMode === ScanningMode.FILE_OVERALL && (
          <>
            {
              <div>
                <span>
                  <h3 className="text-lg">
                    <b>{customRequest?.completionResponse?.file}</b>
                  </h3>
                </span>
                <ReactMarkdown className="custom-request-v3-markdown">
                  {customRequest?.completionResponse?.finalCompletionForFile}
                </ReactMarkdown>
                <br />
              </div>
            }
          </>
        )}

        {customRequest.scanMode === ScanningMode.OVERALL &&
          customRequest?.completionResponse.map((i: any, idx: any) => {
            return (
              <div key={idx}>
                {customRequest?.completionResponse.length > 1 &&
                  `(Part ${i.part + 1})`}
                <ReactMarkdown className="custom-request-v3-markdown">
                  {i.overallCompletion}
                </ReactMarkdown>
                <br />
              </div>
            );
          })}

        {customRequest.scanMode === ScanningMode.FILE_PER_PAGE && (
          <div>
            <h3 className="text-lg">
              <b>{customRequest?.completionResponse.file}</b>
            </h3>
            <ul>
              {customRequest?.completionResponse?.completionsForTheParts?.map(
                (j: any, idx: any) => {
                  return (
                    <li key={idx} className="mt-2">
                      {customRequest?.completionResponse?.completionsForTheParts
                        .length > 1 && `(Page ${idx + 1})`}
                      <ReactMarkdown className="custom-request-v3-markdown">
                        {j}
                      </ReactMarkdown>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        )}
      </div>

      <div
        id="custom-request-v3-aside"
        className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 pt-20 pb-6 xl:block bg-white"
      >
        <div className="mt-6">
          {showSharing && (
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_HOSTNAME}/dashboard/custom-request-v3-result/share?custom-request-v3-id=${customRequest.id}`
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
            </div>
          )}

          <dl className="divide-y divide-gray-100 space-y-10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("dashboard-page:custom-request-v3-result.requested")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                {customRequest?.createdAt
                  ? `${new Date(customRequest.createdAt)}`
                  : t(
                      "dashboard-page:custom-request-v3-result.time-requested-unknown"
                    )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("dashboard-page:custom-request-v3-result.scan-mode")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                {customRequest?.scanMode}
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
                        const rateSummaryRequest = rateCustomRequestV3Factory(customRequest.id, rating, ratingMax);
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
                  {t("dashboard-page:custom-request-v3-result.model")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0 truncate">
                  {customRequest?.model}
                </dd>
              </div>
            )}

            {customRequest.prompt && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("dashboard-page:custom-request-v3-result.prompt")}
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
        customRequestV3={customRequest}
        open={shareModalOpen}
        cb={(isOpen: boolean) => {
          setShareModalOpen(isOpen);
        }}
      />
      <SlideOver
        showOpen={slideOverOpen}
        setShowOpen={setSlideOverOpen}
        customRequest={customRequest}
      />
    </div>
  );
}
