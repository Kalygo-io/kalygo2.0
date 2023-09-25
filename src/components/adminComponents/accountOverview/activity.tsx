import { useAppContext } from "@/context/AppContext";
import { ScanningMode } from "@/types/ScanningMode";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface P {
  activity: any[];
}

export function ActivityTable(p: P) {
  let { activity } = p;
  const router = useRouter();
  const { t } = useTranslation();

  activity = activity.slice(0, 10);

  return activity?.length > 0 ? (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            View all
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Recorded at
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Activity Type
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
            {activity.map((a) => {
              return (
                <tr key={a.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    <p>
                      <time dateTime={new Date(a.createdAt).toLocaleString()}>
                        {new Date(a.createdAt).toLocaleString()}
                      </time>
                    </p>
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Model</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {a.model.slice(0, 16)}
                      </dd>
                      <dt className="sr-only sm:hidden">Mode</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {a.mode}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {a.activityType}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {a.mode === ScanningMode.EACH_FILE_IN_CHUNKS
                      ? `${a?.summary[0]?.summary[0]?.chunkSummary?.slice(
                          0,
                          16
                        )}...`
                      : a.mode === ScanningMode.EACH_FILE_OVERALL
                      ? `${a.summary[0].summary.slice(0, 16)}...`
                      : a.mode === ScanningMode.OVERALL
                      ? `${a.summary[0].summary.slice(0, 16)}...`
                      : `TODO`}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        router.push(
                          `/dashboard/summary-v2?summary-v2-id=${a.id}`
                        );
                      }}
                    >
                      {t("dashboard-page:index.summaries-v2.table.view")}
                      <span className="sr-only">{a.id}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <>No Activity</>
  );
}
