import { useTranslation } from "next-i18next";
import { useState } from "react";
import { deletePromptFromAccessGroupFactory } from "@/serviceFactory/deletePromptFromAccessGroupFactory";

interface P {
  accessGroup: any;
  prompts: any[];
  refresh: any;
}

export function PromptsTable(p: P) {
  let { accessGroup, prompts, refresh } = p;
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  prompts = prompts.slice(0, 10);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Prompts
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Prompts in this access group
          </p>
        </div>
      </div>
      <div className="mx-4 mt-4 sm:-mx-0">
        {prompts.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Added at
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Summary ID
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {prompts.map((prompt) => {
                return (
                  <tr key={prompt.summaryId}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                      <p>
                        <time
                          dateTime={new Date(prompt.createdAt).toLocaleString()}
                        >
                          {new Date(prompt.createdAt).toLocaleString()}
                        </time>
                      </p>
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Summary ID</dt>
                        <dd className="mt-1 truncate text-gray-700">
                          {prompt.summaryId}
                        </dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {prompt.summaryId}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={async () => {
                          await deletePromptFromAccessGroupFactory(
                            prompt.promptId,
                            prompt.accessGroupId
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
          <span className="font-bold">No prompts found</span>
        )}
      </div>
    </div>
  );
}
