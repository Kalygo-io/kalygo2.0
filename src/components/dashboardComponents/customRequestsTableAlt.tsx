import { useAppContext } from "@/context/AppContext";
import { ScanningMode } from "@/types/ScanningMode";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface P {
  customRequests: any[];
}

export function CustomRequestsTableAlt(p: P) {
  let { customRequests } = p;
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();

  customRequests = customRequests.slice(0, 10);

  return (
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
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            View all
          </button>
        </div> */}
      </div>
      <div className="-mx-4 mt-4 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            {/* <tr>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Requested at
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Model
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Mode
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Preview
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">View</span>
              </th>
            </tr> */}
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Requested at
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Model
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Mode
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Preview
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {customRequests.map((customRequest) => {
              // console.log("customRequest", customRequest);

              return (
                // <tr key={customRequest.id}>
                //   <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                //     <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                //       <p>
                //         <time
                //           dateTime={new Date(
                //             customRequest.createdAt
                //           ).toLocaleString()}
                //         >
                //           {new Date(customRequest.createdAt).toLocaleString()}
                //         </time>
                //       </p>
                //     </div>
                //   </td>
                //   <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                //     {customRequest.model}
                //   </td>
                //   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                //     {customRequest.mode}
                //   </td>

                //   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                //     {customRequest?.prompt.slice(0, 20)}
                //     ...
                //   </td>

                //   <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                //     <button
                //       className="text-blue-600 hover:text-blue-900"
                //       onClick={() => {
                //         router.push(
                //           `/dashboard/custom-request-result?custom-request-id=${customRequest.id}`
                //         );
                //       }}
                //     >
                //       {t("dashboard-page:index.custom-requests.table.view")}
                //       <span className="sr-only">{customRequest.id}</span>
                //     </button>
                //   </td>
                // </tr>
                <tr key={customRequest.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    <p>
                      <time
                        dateTime={new Date(
                          customRequest.createdAt
                        ).toLocaleString()}
                      >
                        {new Date(customRequest.createdAt).toLocaleString()}
                      </time>
                    </p>
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Model</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {customRequest.model}
                      </dd>
                      <dt className="sr-only sm:hidden">Mode</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {customRequest.mode}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {customRequest.model}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {customRequest.mode}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customRequest?.prompt.slice(0, 20)}...
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        router.push(
                          `/dashboard/custom-request-result?custom-request-id=${customRequest.id}`
                        );
                      }}
                    >
                      {t("dashboard-page:index.summaries-v2.table.view")}
                      <span className="sr-only">{customRequest.id}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
