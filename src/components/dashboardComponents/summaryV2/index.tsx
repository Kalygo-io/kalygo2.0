import { RadioGroupStars } from "@/components/shared/RatingComponent";
import { rateSummaryFactory } from "@/serviceFactory/rateSummaryFactory";
import { SummaryMode } from "@/types/SummaryMode";
import { round } from "@/utility/Math/round";
import { errorReporter } from "@/utility/error/reporter";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon, StarIcon } from "@heroicons/react/24/outline";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { MouseEventHandler } from "react";
import ReactMarkdown from "react-markdown";

interface P {
  summary: any;
}

export default function SummaryV2(p: P) {
  const { summary } = p;
  const { t } = useTranslation();

  return (
    <div>
      <main className="lg:pl-8">
        <div className="xl:pr-96">
          <div className="mx-4 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
              {/* <ReactMarkdown>{summary?.completionResponse}</ReactMarkdown> */}
              {summary.mode === SummaryMode.PRIOR_TO_TRACKING_MODE &&
                JSON.stringify(summary.summary, null, 2)}
              {summary.mode === SummaryMode.EACH_FILE_OVERALL &&
                summary?.summary.map((i: any, idx: any) => {
                  return (
                    <div key={i.file}>
                      <span>
                        {/* <InformationCircleIcon className="h-4 w-4 inline" /> */}
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
              {summary.mode === SummaryMode.OVERALL &&
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

              {/* {summary.mode === SummaryMode.EACH_FILE_IN_CHUNKS &&
                JSON.stringify(summary.summary, null, 2)} */}
              {summary.mode === SummaryMode.EACH_FILE_IN_CHUNKS &&
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
                                {i?.summary.length > 1 &&
                                  `(Part ${j.chunk + 1})`}
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
            </div>
          </div>
        </div>
      </main>

      <aside
        id="summary-v2-aside"
        className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 pt-20 pb-6 sm:px-6 lg:px-8 xl:block bg-white"
      >
        <div>
          <div className="mt-6">
            <dl className="divide-y divide-gray-100 space-y-10">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {/* {t("dashboard-page:summary-v2.prompt")} */}
                  {t("dashboard-page:summary.requested")}:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                  {/* <ReactMarkdown>{summary?.prompt}</ReactMarkdown> */}
                  {summary?.createdAt
                    ? `${new Date(summary.createdAt)}`
                    : t("dashboard-page:summary.time-requested-unknown")}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("dashboard-page:summary-v2.mode")}:
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
                      maxRating={get(summary, "Ratings.0.maxRating", null)}
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
                    {t("dashboard-page:summary-v2.model")}:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                    {summary?.model}
                  </dd>
                </div>
              )}

              {summary.language && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    {t("dashboard-page:summary-v2.language")}:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                    {summary?.language}
                  </dd>
                </div>
              )}

              {summary.format && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    {t("dashboard-page:summary-v2.format")}:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                    {summary?.format}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </aside>
    </div>
  );
}
