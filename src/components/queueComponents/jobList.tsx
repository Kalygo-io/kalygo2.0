import { removeJobFromQueue } from "@/services/removeJobFromQueue";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Divider } from "@/components/shared/Divider";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { SummaryJob } from "./jsxForJobType/summary";
import { VectorSearch } from "./jsxForJobType/vectorSearch";

interface P {
  jobs: any[];
  fetchCounter: number;
  triggerFetch: Dispatch<SetStateAction<number>>;
}

export const JobList = (p: P) => {
  const { jobs, fetchCounter, triggerFetch } = p;

  const { t } = useTranslation();
  const [counter, setCounter] = useState(0); // for triggering a re-render
  const router = useRouter();

  console.log("jobs", jobs);

  return (
    <div className="relative mx-4 sm:mx-6 lg:mx-8">
      {jobs.length === 0 && t("dashboard-page:queue.no-jobs-found")}
      {jobs.map((i, idx) => {
        console.log("i", i?.data?.jobType);

        let jobTypeJsx = null;
        switch (i?.data?.jobType) {
          case "Summary":
            jobTypeJsx = <SummaryJob job={i} />;
            break;
          case "VectorSearch":
            jobTypeJsx = <VectorSearch job={i} />;
            break;
        }

        return (
          <div key={idx}>
            <Divider />
            <h4 className="sr-only">{t("dashboard-page:queue.job-status")}</h4>
            {jobTypeJsx}
            <div className="mt-6" aria-hidden="true">
              <div className="overflow-hidden rounded-full bg-gray-200">
                {i?.failedReason ? (
                  <div
                    className="h-2 rounded-full bg-red-600"
                    style={{ width: `100%` }}
                  />
                ) : (
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${i?.progress}%` }}
                  />
                )}
              </div>

              <span className="mt-2 isolate inline-flex rounded-md">
                {i?.finishedOn && (
                  <button
                    type="button"
                    className="relative inline-flex items-center bg-white px-2 py-2 text-sm font-semibold text-red-500 focus:z-10"
                    onClick={() => {
                      console.log("!!!");
                      removeJobFromQueue(i?.id);
                      triggerFetch(fetchCounter + 1);
                    }}
                  >
                    {t("dashboard-page:queue.remove")}
                  </button>
                )}
                {i?.progress === 100 && i?.returnvalue?.summaryId && (
                  <button
                    type="button"
                    className="relative inline-flex items-center bg-white px-2 py-2 text-sm font-semibold text-blue-500 focus:z-10"
                    onClick={() => {
                      router.push(
                        `/dashboard/summary?summary-id=${i.returnvalue.summaryId}`
                      );
                    }}
                  >
                    {t("dashboard-page:queue.view")}
                  </button>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
