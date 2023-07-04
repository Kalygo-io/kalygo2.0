import { useTranslation } from "next-i18next";
import React from "react";

export const VectorSearch = (props: { job: any }) => {
  const { t } = useTranslation();
  const { job } = props;

  return (
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
  );
};
