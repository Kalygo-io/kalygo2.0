import React from "react";
import LinkComponent from "../shared/Link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";

interface P {
  customRequests: any[];
}

export const CustomRequestsTable = (p: P) => {
  let { customRequests } = p;

  const { state, dispatch } = useAppContext();

  const router = useRouter();
  const { t } = useTranslation();

  customRequests = customRequests.slice(0, 10);

  return customRequests.length > 0 ? (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {t("dashboard-page:index.custom-requests.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t("dashboard-page:index.custom-requests.subtitle")}
          </p>
        </div>
        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            disabled
            type="button"
            className="opacity-50 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {t("dashboard-page:index.custom-requests.view-all")}
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
                    {t("dashboard-page:index.custom-requests.table.id")}
                  </th> */}
                  {/* <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {t("dashboard-page:index.custom-requests.table.filename")}
                  </th> */}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {t("dashboard-page:index.custom-requests.table.date")}
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">
                      {t("dashboard-page:index.custom-requests.table.edit")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {customRequests?.map((customRequest) => (
                  <tr key={customRequest.id} className="even:bg-gray-50">
                    {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {summary.id}
                    </td> */}
                    {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {summary.filename}
                    </td> */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(customRequest.createdAt).toLocaleString()}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          router.push(
                            `/dashboard/custom-request-result?custom-request-id=${customRequest.id}`
                          );
                        }}
                      >
                        {t("dashboard-page:index.custom-requests.table.view")}
                        <span className="sr-only"> {customRequest.id}</span>
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
    <>{t("dashboard-page:index.no-custom-requests-yet")}</>
  );
};
