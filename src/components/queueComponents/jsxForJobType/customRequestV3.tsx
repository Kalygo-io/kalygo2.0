import { removeJobFromQueue } from "@/services/removeJobFromQueue";
import { retryJob } from "@/services/retryJob";
import {
  DocumentMagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import { NextRouter } from "next/router";
import React, { Dispatch } from "react";

export const CustomRequestV3 = (props: {
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
          {/* <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:queue.custom-request.prompt")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {job?.data?.jobType}
              The Prompt
            </dd>
          </div> */}
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:queue.custom-request-v3.scan-mode")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul>
                <li>{job?.data?.params?.customizations?.scanMode}</li>
              </ul>
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {job?.data?.params?.files
                ? t("dashboard-page:queue.file-names")
                : t("dashboard-page:queue.file-name")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {job?.data?.params?.files
                ? job?.data?.params?.files?.map((f: any) => f.originalname)
                : job?.data?.params?.file?.originalname}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:queue.processed-on")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {job?.processedOn ? `${new Date(job?.processedOn)}` : "in queue"}
            </dd>
          </div>
        </dl>
      </div>
      <span className="mt-2 isolate inline-flex rounded-md">
        {(job?.finishedOn || true) && (
          <>
            <button
              type="button"
              className="mx-0.5 inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => {
                removeJobFromQueue(job?.id);
                triggerFetch(fetchCounter + 1);
              }}
            >
              {t("dashboard-page:queue.remove")}
            </button>
            <button
              type="button"
              className="mx-0.5 inline-flex items-center gap-x-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => {
                retryJob(job?.id);
                triggerFetch(fetchCounter + 1);
              }}
            >
              {t("dashboard-page:queue.retry")}
            </button>
          </>
        )}
        {/* {job?.finishedOn && (
          <button
            type="button"
            className="mx-0.5 inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={() => {
              removeJobFromQueue(job?.id);
              triggerFetch(fetchCounter + 1);
            }}
          >
            {t("dashboard-page:queue.remove")}
          </button>
        )} */}
        {job?.progress === 100 && job?.returnvalue?.customRequestV3Id && (
          <button
            type="button"
            className="mx-0.5 inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => {
              router.push(
                `/dashboard/custom-request-v3-result?custom-request-v3-id=${job?.returnvalue?.customRequestV3Id}`
              );
            }}
          >
            {t("dashboard-page:queue.view")}
            {/* <DocumentMagnifyingGlassIcon
              className="-mr-0.5 h-5 w-5"
              aria-hidden="true"
            /> */}
          </button>
        )}
      </span>
    </>
  );
};
