import { RadioGroupStars } from "@/components/shared/RatingComponent";
import { rateSummaryFactory } from "@/serviceFactory/rateSummaryFactory";
import { errorReporter } from "@/utility/error/reporter";
import { Bars3Icon, LinkIcon, ShareIcon } from "@heroicons/react/24/outline";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ShareModal } from "./components/shareModal";
import { SlideOver } from "./components/slideOver";
import { ScanningMode } from "@/types/ScanningMode";

interface P {
  summary: any;
  account?: any;
  refresh?: any;
  refreshCount?: number;
  showSharing?: boolean;
}

export default function SummaryV2(p: P) {
  const { summary, account, refresh, refreshCount, showSharing } = p;
  const { t } = useTranslation();

  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  return (
    <div className="xl:pr-96">
      {/* Main area */}
      <div className="w-full flex justify-between fixed bg-white lg:pr-[calc(18rem)] xl:pr-[calc(42rem)] shadow-sm">
        <h3 className="p-4 text-3xl font-bold text-gray-900 whitespace-nowrap truncate">
          Summary
        </h3>
        {showSharing && (
          <div className="flex justify-center mr-4 xl:hidden">
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
        {summary.scanMode === ScanningMode.PRIOR_TO_TRACKING_MODE &&
          JSON.stringify(summary.summary, null, 2)}

        {summary.scanMode === ScanningMode.FILE_OVERALL && (
          <div>
            <ReactMarkdown className="summary-v2-markdown">
              {summary?.summary}
            </ReactMarkdown>
            <br />
          </div>
        )}

        {summary.scanMode === ScanningMode.EACH_FILE_OVERALL &&
          summary?.summary.map((i: any, idx: any) => {
            return (
              <div key={i.file}>
                <span>
                  <h3 className="text-lg">
                    <b>{i.file}</b>
                  </h3>
                </span>
                <ReactMarkdown className="summary-v2-markdown">
                  {i.summary}
                </ReactMarkdown>
                <br />
              </div>
            );
          })}
        {summary.scanMode === ScanningMode.OVERALL && (
          <h3 className="text-lg">
            <b>{summary.title}</b>
          </h3>
        )}
        {summary.scanMode === ScanningMode.OVERALL &&
          summary?.summary.map((i: any, idx: any) => {
            return (
              <div key={idx}>
                {summary?.summary.length > 1 && `(Part ${i.part + 1})`}
                <ReactMarkdown className="summary-v2-markdown">
                  {i.summary}
                </ReactMarkdown>
                <br />
              </div>
            );
          })}
        {summary.scanMode === ScanningMode.EACH_FILE_IN_CHUNKS &&
          summary?.summary.map((i: any, idx: any) => {
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
                          <ReactMarkdown className="summary-v2-markdown">
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

        {summary.scanMode === ScanningMode.EACH_FILE_PER_PAGE &&
          summary?.summary.map((i: any, idx: any) => {
            {
              return (
                <div key={idx}>
                  <h3 className="text-lg my-4">
                    <b>{i.file}</b>
                  </h3>
                  <ul>
                    {i?.summariesOfTheParts?.map((j: any, idx: any) => {
                      return (
                        <li key={idx} className="mt-2">
                          {i?.summariesOfTheParts.length > 1 &&
                            `(Page ${idx + 1})`}

                          <ReactMarkdown className="summary-v2-markdown">
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

      <div
        id="summary-v2-aside"
        className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 pt-20 pb-6 sm:px-6 lg:px-8 xl:block bg-white"
      >
        <div className="mt-6">
          {showSharing && (
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_HOSTNAME}/dashboard/summary-v2/share?summary-v2-id=${summary.id}`
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
                {t("dashboard-page:summary.requested")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                {summary?.createdAt
                  ? `${new Date(summary.createdAt)}`
                  : t("dashboard-page:summary.time-requested-unknown")}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("dashboard-page:summary-v2.mode")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                {summary?.scanMode}
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
                    maxRating={get(summary, "Ratings.0.maxRating", null)}
                    recordRating={async (rating: number, ratingMax: number) => {
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
                  {t("dashboard-page:summary-v2.model")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0 truncate">
                  {summary?.model}
                </dd>
              </div>
            )}

            {summary.language && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("dashboard-page:summary-v2.language")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                  {summary?.language}
                </dd>
              </div>
            )}

            {summary.format && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("dashboard-page:summary-v2.format")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                  {summary?.format}
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
        summary={summary}
        open={shareModalOpen}
        cb={(isOpen: boolean) => {
          setShareModalOpen(isOpen);
        }}
      />
      <SlideOver
        showOpen={slideOverOpen}
        setShowOpen={setSlideOverOpen}
        summary={summary}
      />
    </div>
  );
}
