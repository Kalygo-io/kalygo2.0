"use client";

import Head from "next/head";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { useGetAccount } from "@/utility/hooks/getAccount";
import { AccessGroupsTable } from "@/components/dashboardComponents/accessGroups/accessGroupsTable";
import { NewAccessGroupModal } from "@/components/accessGroupsComponents/newAccessGroupModal";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/utility/misc/classNames";
import { deleteAccessGroupFactory } from "@/serviceFactory/deleteAccessGroupFactory";
import { errorReporter } from "@/utility/error/reporter";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
  "dashboard-page",
  "toast-messages",
]);
export { getStaticPaths, getStaticProps };

export default function AccessGroups() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();
  const router = useRouter();

  const [accessGroups, setAccessGroups] = useState<{
    val: any[];
    loading: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    err: null,
  });

  const { account } = useGetAccount();
  const [newAccessGroupOpen, setNewAccessGroupOpen] = useState<boolean>(false);
  const [refreshCount, refresh] = useState<number>(0);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/get-access-groups`,
          {
            withCredentials: true,
          }
        );

        setAccessGroups({
          loading: false,
          val: res.data,
          err: null,
        });
      } catch (e) {
        setAccessGroups({
          loading: false,
          val: [],
          err: e,
        });
      }
    }

    fetch();
  }, [refreshCount]);

  let jsx = null;

  if (accessGroups.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (accessGroups.err) {
    jsx = <ErrorInDashboard />;
  } else if (accessGroups.val) {
    jsx = <AccessGroupsTable groups={accessGroups.val} refresh={refresh} />;
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard account={account.val}>
        <div className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto min-h-screen">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:access-groups.title")}
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                {t("dashboard-page:access-groups.description")}
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  setNewAccessGroupOpen(true);
                }}
              >
                {t("dashboard-page:access-groups.create")}
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root min-h-screen">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 overflow-y-scroll no-scrollbar min-h-screen">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Matter name
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Created at
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {accessGroups?.val?.map((group) => {
                      return (
                        <tr key={group.id}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                            <p>{group.name}</p>
                            <dl className="font-normal lg:hidden">
                              <dt className="sr-only sm:hidden">Name</dt>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                {/* {group.name} */}
                                <time
                                  dateTime={new Date(
                                    group.createdAt
                                  ).toLocaleString()}
                                >
                                  {new Date(group.createdAt).toLocaleString()}
                                </time>
                              </dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            <time
                              dateTime={new Date(
                                group.createdAt
                              ).toLocaleString()}
                            >
                              {new Date(group.createdAt).toLocaleString()}
                            </time>
                          </td>
                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            {/* <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => {
                                router.push(
                                  `/dashboard/access-group?access-group-id=${group.id}`
                                );
                              }}
                            >
                              {t(
                                "dashboard-page:index.summaries-v2.table.view"
                              )}
                              <span className="sr-only">{group.id}</span>
                            </button> */}
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
                                          onClick={() => {
                                            router.push(
                                              `/dashboard/access-group?access-group-id=${group.id}`
                                            );
                                          }}
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          View
                                        </span>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <span
                                          onClick={async () => {
                                            try {
                                              const request =
                                                await deleteAccessGroupFactory(
                                                  group.id
                                                );
                                              const response = await request;
                                              refresh((val) => val + 1);
                                            } catch (e) {
                                              errorReporter(e);
                                            }
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
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
      <NewAccessGroupModal
        open={newAccessGroupOpen}
        cb={(isOpen: boolean) => {
          console.log("--- ___ ---");
          setNewAccessGroupOpen(isOpen);
          refresh((val) => val + 1);
        }}
      />
    </>
  );
}

AccessGroups.requireAuth = true;
