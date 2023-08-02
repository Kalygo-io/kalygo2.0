import React from "react";
import LinkComponent from "../shared/Link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { round } from "@/utility/Math/round";

interface P {
  summaries: any[];
}

export const SummariesV2Table = (p: P) => {
  let { summaries } = p;

  const { state, dispatch } = useAppContext();

  const router = useRouter();
  const { t } = useTranslation();

  summaries = summaries.slice(0, 10);

  return summaries.length > 0 ? (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {t("dashboard-page:index.summaries-v2.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t("dashboard-page:index.summaries-v2.subtitle")}
          </p>
        </div>
        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            disabled
            type="button"
            className="opacity-50 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {t("dashboard-page:index.summaries-v2.view-all")}
          </button>
        </div> */}
      </div>
      {/* <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"> */}
      <ul role="list" className="divide-y divide-gray-300">
        {/* <thead>
          <tr> */}
        {/* <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    {t("dashboard-page:index.summaries-v2.table.id")}
                  </th> */}
        {/* <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {t("dashboard-page:index.summaries-v2.table.filename")}
                  </th> */}
        {/* <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              {t("dashboard-page:index.summaries-v2.table.date")}
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">
                {t("dashboard-page:index.summaries-v2.table.edit")}
              </span>
            </th> */}
        {/* </tr>
        </thead> */}
        {/* <tbody className="bg-white"> */}
        {summaries?.map((summary) => {
          const completionResponse = summary.completionResponse?.slice(0, 10);

          return (
            <li
              key={summary.id}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
            >
              <div>
                <p className="text-sm font-semibold leading-6 text-gray-900"></p>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p></p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p>
                    <time
                      dateTime={new Date(summary.createdAt).toLocaleString()}
                    >
                      {new Date(summary.createdAt).toLocaleString()}
                    </time>
                  </p>
                </div>
              </div>
              <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                <div className="flex -space-x-0.5">
                  <dt className="sr-only">Files</dt>
                  {Object.keys(completionResponse).map(
                    (item: any, idx: number) => (
                      <dd key={idx}>
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800"></span>
                      </dd>
                    )
                  )}
                </div>
                <div className="flex w-16 gap-x-2.5">
                  <dt>
                    <span className="sr-only">View</span>
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        router.push(
                          `/dashboard/summary-v2?summary-v2-id=${summary.id}`
                        );
                      }}
                    >
                      {t("dashboard-page:index.summaries-v2.table.view")}
                      <span className="sr-only">{summary.id}</span>
                    </button>
                  </dt>
                  <dd className="text-sm leading-6 text-gray-900"></dd>
                </div>
              </dl>
              {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {summary.id}
                    </td> */}
              {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {summary.filename}
                    </td> */}
              {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {new Date(summary.createdAt).toLocaleString()}
            </td> */}
              {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
              <button
                className="text-blue-600 hover:text-blue-900"
                onClick={() => {
                  router.push(
                    `/dashboard/summary-v2?summary-v2-id=${summary.id}`
                  );
                }}
              >
                {t("dashboard-page:index.summaries-v2.table.view")}
                <span className="sr-only"> {summary.id}</span>
              </button>
            </td> */}
            </li>
          );
        })}
        {/* </tbody> */}
      </ul>
      {/* </div>
        </div>
      </div> */}
    </div>
  ) : (
    <>{t("dashboard-page:index.no-summaries-v2-yet")}</>
  );
};
