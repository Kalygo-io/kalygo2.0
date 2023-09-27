import { deleteAccountContextDocumentFactory } from "@/serviceFactory/deleteAccountContextDocumentFactory";
import { deleteAccountFromAccessGroupFactory } from "@/serviceFactory/deleteAccountFromAccessGroupFactory";
import { downloadAccountContextDocumentFactory } from "@/serviceFactory/downloadAccountContextDocumentFactory";
import { uploadContextDocumentFactory } from "@/serviceFactory/uploadContextDocumentFactory";
import { errorReporter } from "@/utility/error/reporter";
import { classNames } from "@/utility/misc/classNames";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import saveAs from "file-saver";
import { useTranslation } from "next-i18next";
import { Fragment, useRef, useState } from "react";

interface P {
  account: any;
  documents: any[];
  refresh: any;
}

export function ContextDocumentsTable(p: P) {
  let { account, documents, refresh } = p;
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async function (e: any) {
    try {
      console.log("handleChange");
      e.preventDefault();
      if (e.target && e.target.files) {
        const request = uploadContextDocumentFactory(
          account.id,
          e.target.files[0]
        );
        await request;
        refresh((val: number) => val + 1);
      }
    } catch (e) {
      errorReporter(e);
    }
  };

  console.log("documents", documents);

  documents = documents.slice(0, 10);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Context
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Context documents related to this account
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="mb-2 mt-2 flex items-center justify-center text-sm leading-6 text-gray-600">
            <label
              htmlFor="input-file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
            >
              <button
                type="button"
                className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => {
                  inputRef.current?.click();
                }}
              >
                {t("dashboard-page:admin.account.context.upload")}
                <input
                  ref={inputRef}
                  type="file"
                  id="input-file-upload"
                  multiple={false}
                  onChange={handleChange}
                  accept=".pdf,.txt"
                  className="sr-only"
                />
              </button>
            </label>
          </div>
        </div>
      </div>
      <div className="mx-4 mt-4 sm:-mx-0">
        {documents.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Original name
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {documents.map((doc) => {
                return (
                  <tr key={doc.id}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                      <p>
                        <time
                          dateTime={new Date(doc.createdAt).toLocaleString()}
                        >
                          {new Date(doc.createdAt).toLocaleString()}
                        </time>
                      </p>
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Original name</dt>
                        <dd className="mt-1 truncate text-gray-700">
                          {doc.originalName}
                        </dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {doc.originalName}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="flex items-center rounded-full bg-gray-100 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm cursor-pointer"
                                    )}
                                    onClick={async () => {
                                      console.log("Download");
                                      const request =
                                        downloadAccountContextDocumentFactory(
                                          doc.id,
                                          account.id
                                        );
                                      const response = await request;

                                      var blob = new Blob([response?.data]);
                                      saveAs(blob, doc.originalName);
                                    }}
                                  >
                                    Download
                                  </span>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm cursor-pointer"
                                    )}
                                    onClick={async () => {
                                      console.log("Delete");
                                      await deleteAccountContextDocumentFactory(
                                        doc.id,
                                        account.id
                                      );

                                      refresh((val: number) => val + 1);
                                    }}
                                  >
                                    Delete
                                  </span>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className="font-bold">No documents found</span>
        )}
      </div>
    </div>
  );
}
