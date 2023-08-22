import { RadioGroupStars } from "@/components/shared/RatingComponent";
import { rateCustomRequestFactory } from "@/serviceFactory/rateCustomRequestFactory";
import { rateSummaryFactory } from "@/serviceFactory/rateSummaryFactory";
import { ScanningMode } from "@/types/ScanningMode";
import { SummaryMode } from "@/types/SummaryMode";
import { errorReporter } from "@/utility/error/reporter";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import ReactMarkdown from "react-markdown";

interface P {
  customRequest: any;
}

export default function CustomRequest(p: P) {
  const { customRequest } = p;
  const { t } = useTranslation();

  console.log("customRequest", customRequest);

  return (
    <div>
      <main className="lg:pl-8">
        <div className="xl:pr-96">
          <div className="mx-4 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
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

              {customRequest.mode === ScanningMode.EACH_FILE_OVERALL &&
                customRequest?.completionResponse.map((i: any, idx: any) => {
                  return (
                    <div key={i.file}>
                      <span>
                        {/* <InformationCircleIcon className="h-4 w-4 inline" /> */}
                        <h3 className="text-lg">
                          <b>{i.file}</b>
                        </h3>
                      </span>
                      <ReactMarkdown className="summary-v2-markdown">
                        {i.finalCompletionForFile}
                      </ReactMarkdown>
                      <br />
                    </div>
                  );
                })}

              {customRequest.mode === ScanningMode.OVERALL &&
                customRequest?.completionResponse.map((i: any, idx: any) => {
                  return (
                    <div key={idx}>
                      {customRequest?.completionResponse.length > 1 &&
                        `(Part ${i.part + 1})`}
                      <ReactMarkdown className="summary-v2-markdown">
                        {i.overallCompletion}
                      </ReactMarkdown>
                      <br />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>

      <aside
        id="custom-request-aside"
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
                      maxRating={get(
                        customRequest,
                        "Ratings.0.maxRating",
                        null
                      )}
                      recordRating={async (
                        rating: number,
                        ratingMax: number
                      ) => {
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
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                    {customRequest?.model}
                  </dd>
                </div>
              )}

              {customRequest.prompt && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    {t("dashboard-page:custom-request.prompt")}:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                    {customRequest?.prompt}
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
