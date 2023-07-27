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
            {t("dashboard-page:index.summaries.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t("dashboard-page:index.summaries.subtitle")}
          </p>
        </div>
        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            disabled
            type="button"
            className="opacity-50 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {t("dashboard-page:index.summaries.view-all")}
          </button>
        </div> */}
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {/* <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    {t("dashboard-page:index.summaries.table.id")}
                  </th> */}
                  {/* <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {t("dashboard-page:index.summaries.table.filename")}
                  </th> */}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {t("dashboard-page:index.summaries.table.date")}
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">
                      {t("dashboard-page:index.summaries.table.edit")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {summaries?.map((summary) => (
                  <tr key={summary.id} className="even:bg-gray-50">
                    {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {summary.id}
                    </td> */}
                    {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {summary.filename}
                    </td> */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(summary.createdAt).toLocaleString()}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          router.push(
                            `/dashboard/summary-v2?summary-v2-id=${summary.id}`
                          );
                        }}
                      >
                        {t("dashboard-page:index.summaries.table.view")}
                        <span className="sr-only"> {summary.id}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>{t("dashboard-page:index.no-summaries-v2-yet")}</>
  );
};
