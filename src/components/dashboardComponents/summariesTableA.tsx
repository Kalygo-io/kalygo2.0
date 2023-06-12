import React from "react";
import LinkComponent from "../shared/Link";

interface P {
  summaries: {
    val: any[];
    loading: boolean;
    err: any;
  };
}

export const SummariesTableA = (p: P) => {
  const { summaries } = p;

  return summaries.val.length > 0 ? (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            Id
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Original Length
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Condensed Length
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {summaries.val.map((summary) => (
          <tr key={summary.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
              {summary.id}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {summary.originalCharCount}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {summary.condensedCharCount}
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <LinkComponent
                href="/dashboard/summary"
                className="text-blue-600 hover:text-blue-900"
              >
                View
                <span className="sr-only">, {summary.id}</span>
              </LinkComponent>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <>{t("dashboard-page:index.no-documents-yet")}</>
  );
};
