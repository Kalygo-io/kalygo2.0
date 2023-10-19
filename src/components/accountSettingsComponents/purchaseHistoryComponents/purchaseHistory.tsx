import { useAppContext } from "@/context/AppContext";
import { ScanningMode } from "@/types/ScanningMode";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface P {
  charges: any;
}

export function PurchaseHistoryTable(p: P) {
  let { charges } = p;
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();

  charges = charges ? charges?.data?.slice(0, 40) : [];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-4 sm:-mx-0">
        {charges.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Last 4
                </th>
                {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">View</span>
              </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {charges.map((charge: any) => {
                return (
                  <tr key={charge.id}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                      <p>{new Date(charge.created * 1000).toLocaleString()}</p>
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Status</dt>
                        <dd className="mt-1 truncate text-gray-700">
                          {charge.status}
                        </dd>
                        <dt className="sr-only sm:hidden">Amount</dt>
                        <dd className="mt-1 truncate text-gray-500 sm:hidden">
                          $
                          {`${(charge.amount / 100).toLocaleString(
                            navigator.language,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )} ${charge.currency}`}
                        </dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {charge.status}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      $
                      {`${(charge.amount / 100).toLocaleString(
                        navigator.language,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )} ${charge.currency}`}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {get(charge, "source.last4", "N/A")}
                    </td>
                    {/* <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        router.push(
                          `/dashboard/summary-v2?summary-v2-id=${charge.id}`
                        );
                      }}
                    >
                      {t("dashboard-page:index.summaries-v2.table.view")}
                      <span className="sr-only">{charge.id}</span>
                    </button>
                  </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No charges found"
        )}
      </div>
    </div>
  );
}
