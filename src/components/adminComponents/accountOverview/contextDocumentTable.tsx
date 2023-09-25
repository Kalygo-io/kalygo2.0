import { ScanningMode } from "@/types/ScanningMode";
import React from "react";

interface P {
  documents: any[];
}

export function ContextDocumentTable(p: P) {
  const { documents } = p;

  return documents?.length > 0 ? (
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
                Created At
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Preview
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Download</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {documents.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    <p>
                      <time dateTime={new Date(doc.createdAt).toLocaleString()}>
                        {new Date(doc.createdAt).toLocaleString()}
                      </time>
                    </p>
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Model</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {doc.model.slice(0, 16)}
                      </dd>
                      <dt className="sr-only sm:hidden">Mode</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {doc.mode}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {doc.activityType}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {doc.mode === ScanningMode.EACH_FILE_IN_CHUNKS
                      ? `${doc?.summary[0]?.summary[0]?.chunkSummary?.slice(
                          0,
                          16
                        )}...`
                      : doc.mode === ScanningMode.EACH_FILE_OVERALL
                      ? `${doc.summary[0].summary.slice(0, 16)}...`
                      : doc.mode === ScanningMode.OVERALL
                      ? `${doc.summary[0].summary.slice(0, 16)}...`
                      : `TODO`}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        console.log("Download");
                        // router.push(
                        //   `/dashboard/summary-v2?summary-v2-id=${a.id}`
                        // );
                      }}
                    >
                      {/* {t("dashboard-page:index.summaries-v2.table.view")} */}
                      Download
                      <span className="sr-only">{doc.id}</span>
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
    <>No Context</>
  );
}
