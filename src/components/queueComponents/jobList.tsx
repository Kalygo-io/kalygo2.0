import React, { Dispatch, SetStateAction, useState } from "react";
import { Divider } from "@/components/shared/Divider";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { SummaryJob } from "./jsxForJobType/summary";
import { CustomRequest } from "./jsxForJobType/customRequest";
import { CustomRequestV3 } from "./jsxForJobType/customRequestV3";
import { VectorSearch } from "./jsxForJobType/vectorSearch";
import { SummaryV2Job } from "./jsxForJobType/summaryV2";
import { SummaryV3Job } from "./jsxForJobType/summaryV3";
import { RagRequest } from "./jsxForJobType/ragRequest";

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
      {jobs.length === 0 && t("dashboard-page:queue.nothing-found")}
      {jobs.map((i, idx) => {
        console.log("i", i?.data?.jobType);

        let jobTypeJsx = null;
        switch (i?.data?.jobType) {
          case "Summary":
            jobTypeJsx = (
              <SummaryJob
                job={i}
                router={router}
                triggerFetch={triggerFetch}
                fetchCounter={fetchCounter}
              />
            );
            break;
          case "SummaryV2":
            jobTypeJsx = (
              <SummaryV2Job
                job={i}
                router={router}
                triggerFetch={triggerFetch}
                fetchCounter={fetchCounter}
              />
            );
            break;
          case "SummaryV3":
            jobTypeJsx = (
              <SummaryV3Job
                job={i}
                router={router}
                triggerFetch={triggerFetch}
                fetchCounter={fetchCounter}
              />
            );
            break;
          case "VectorSearch":
            jobTypeJsx = (
              <VectorSearch
                job={i}
                router={router}
                triggerFetch={triggerFetch}
                fetchCounter={fetchCounter}
              />
            );
            break;
          case "CustomRequest":
            jobTypeJsx = (
              <CustomRequest
                job={i}
                router={router}
                triggerFetch={triggerFetch}
                fetchCounter={fetchCounter}
              />
            );
            break;
          case "CustomRequestV3":
            jobTypeJsx = (
              <CustomRequestV3
                job={i}
                router={router}
                triggerFetch={triggerFetch}
                fetchCounter={fetchCounter}
              />
            );
            break;
          case "RagRequest":
            jobTypeJsx = (
              <RagRequest
                job={i}
                router={router}
                triggerFetch={triggerFetch}
                fetchCounter={fetchCounter}
              />
            );
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
                    className="h-1 rounded-full bg-red-600"
                    style={{ width: `100%` }}
                  />
                ) : (
                  <div
                    className="h-1 rounded-full bg-blue-600"
                    style={{ width: `${i?.progress}%` }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
