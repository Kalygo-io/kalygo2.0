import { errorReporter } from "@/utility/error/reporter";
import { classNames } from "@/utility/misc/classNames";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import saveAs from "file-saver";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";

interface P {
  jobs: any[];
  refresh: Dispatch<SetStateAction<number>>;
  account: any;
}

export const JobsTable = (p: P) => {
  let { jobs, refresh, account } = p;
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <div className="p-2 overflow-y-scroll no-scrollbar min-h-screen">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {/* {t("dashboard-page:access-groups.title")} */}
              Jobs
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {/* {t("dashboard-page:access-groups.description")} */}
              All the jobs associated within a batch of jobs
            </p>
          </div>
          <div className="sm:flex sm:items-center"></div>
        </div>
        <div className="-mx-4 mt-4 sm:-mx-0">
          {jobs.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Doc name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Created at
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {jobs.map((job) => {
                  return (
                    <tr key={job.id}>
                      <td className="px-3 py-4 text-sm font-medium text-gray-900">
                        {job.originalName}
                      </td>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-gray-500 sm:w-auto sm:max-w-none sm:pl-0">
                        <p>
                          <time
                            dateTime={new Date(job.createdAt).toLocaleString()}
                          >
                            {new Date(job.createdAt).toLocaleString()}
                          </time>
                        </p>
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <Menu.Button className="flex items-center rounded-full bg-gray-100 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 z-0">
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
                                      onClick={async () => {
                                        // console.log("DOWNLOAD");
                                        // const request = downloadFileFactory(
                                        //   doc.id
                                        // );
                                        // const response = await request;
                                        // const blob = new Blob([response?.data]);
                                        // saveAs(blob, doc.originalName);
                                      }}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm cursor-pointer"
                                      )}
                                    >
                                      Download
                                    </span>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <span
                                      onClick={async () => {
                                        // try {
                                        //   const request =
                                        //     await deleteFileFactory(doc.id);
                                        //   const response = await request;
                                        //   refresh((val) => val + 1);
                                        // } catch (e) {
                                        //   errorReporter(e);
                                        // }
                                      }}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
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
            <>{t("dashboard-page:jobs-table.no-jobs-found")}</>
          )}
        </div>
      </div>
    </>
  );
};
