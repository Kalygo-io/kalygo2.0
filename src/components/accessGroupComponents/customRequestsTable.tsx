import { useTranslation } from "next-i18next";
import { useState } from "react";
import { deleteCustomRequestFromAccessGroupFactory } from "@/serviceFactory/deleteCustomRequestFromAccessGroupFactory";

interface P {
  accessGroup: any;
  customRequests: any[];
  refresh: any;
}

export function CustomRequestsTable(p: P) {
  let { accessGroup, customRequests, refresh } = p;
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  customRequests = customRequests.slice(0, 10);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Custom Requests
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Custom Requests in this access group
          </p>
        </div>
      </div>
      <div className="mx-4 mt-4 sm:-mx-0">
        {customRequests.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Custom Request ID
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Added at
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customRequests.map((customRequest) => {
                return (
                  <tr key={customRequest.customRequestId}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                      <p>{customRequest.customRequestId}</p>
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Custom Request ID</dt>
                        <dd className="mt-1 truncate text-gray-700">
                          <time
                            dateTime={new Date(
                              customRequest.createdAt
                            ).toLocaleString()}
                          >
                            {new Date(customRequest.createdAt).toLocaleString()}
                          </time>
                        </dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      <time
                        dateTime={new Date(
                          customRequest.createdAt
                        ).toLocaleString()}
                      >
                        {new Date(customRequest.createdAt).toLocaleString()}
                      </time>
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={async () => {
                          await deleteCustomRequestFromAccessGroupFactory(
                            customRequest.customRequestId,
                            customRequest.accessGroupId
                          );
                          refresh((val: number) => val + 1);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className="font-bold">No custom requests found</span>
        )}
      </div>
    </div>
  );
}
