import { removeJobFromQueue } from "@/services/removeJobFromQueue";
import { useTranslation } from "next-i18next";
import { NextRouter } from "next/router";
import React, { Dispatch } from "react";

export const VectorSearch = (props: {
  job: any;
  router: NextRouter;
  triggerFetch: Dispatch<React.SetStateAction<number>>;
  fetchCounter: number;
}) => {
  const { t } = useTranslation();
  const { job, router, triggerFetch, fetchCounter } = props;

  return (
    <>
      <div>
        <dl>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:queue.job-type")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {job?.data?.jobType}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:queue.vector-search.query")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <i>{job?.data?.params?.query}</i>
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:queue.requested-at")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {`${new Date(job?.processedOn)}`}
            </dd>
          </div>
        </dl>
      </div>
      <span className="mt-2 isolate inline-flex rounded-md">
        {job?.finishedOn && (
          <button
            type="button"
            className="relative inline-flex items-center bg-white px-2 py-2 text-sm font-semibold text-red-500 focus:z-10"
            onClick={() => {
              console.log("!!!");
              removeJobFromQueue(job?.id);
              triggerFetch(fetchCounter + 1);
            }}
          >
            {t("dashboard-page:queue.remove")}
          </button>
        )}
        {job?.progress === 100 && job?.returnvalue?.vectorSearchId && (
          <button
            type="button"
            className="relative inline-flex items-center bg-white px-2 py-2 text-sm font-semibold text-blue-500 focus:z-10"
            onClick={() => {
              router.push(
                `/dashboard/vector-search-result?vector-search-id=${job?.returnvalue?.vectorSearchId}`
              );
            }}
          >
            {t("dashboard-page:queue.view")}
          </button>
        )}
      </span>
    </>
  );
};
