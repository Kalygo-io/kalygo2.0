import { useAppContext } from "@/context/AppContext";
import { ScanningMode } from "@/types/ScanningMode";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface P {
  summaries: any[];
}

export function SummariesV2TableAlt(p: P) {
  let { summaries } = p;
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();

  summaries = summaries.slice(0, 10);

  return (
    <div className="px-4 pt-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {t("dashboard-page:index.summaries-v2.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t("dashboard-page:index.summaries-v2.subtitle")}
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-4 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
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
            {summaries.map((summary) => {
              return (
                <tr key={summary.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    <p>
                      <time
                        dateTime={new Date(summary.createdAt).toLocaleString()}
                      >
                        {new Date(summary.createdAt).toLocaleString()}
                      </time>
                    </p>
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Model</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {summary.model.slice(0, 16)}
                      </dd>
                      <dt className="sr-only sm:hidden">Mode</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {summary.mode}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {summary.model.length > 24
                      ? `${summary.model.slice(0, 24)}...`
                      : summary.model}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {summary.mode}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {summary.mode === ScanningMode.EACH_FILE_IN_CHUNKS
                      ? `${summary?.summary[0]?.summary[0]?.chunkSummary?.slice(
                          0,
                          16
                        )}...`
                      : summary.mode === ScanningMode.EACH_FILE_OVERALL
                      ? `${summary.summary[0].summary.slice(0, 16)}...`
                      : summary.mode === ScanningMode.OVERALL
                      ? `${summary.summary[0].summary.slice(0, 16)}...`
                      : `TODO`}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
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
