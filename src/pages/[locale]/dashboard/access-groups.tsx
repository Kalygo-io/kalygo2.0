"use client";

import Head from "next/head";

import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { useEffect, useState } from "react";
import axios from "axios";
import { WindowLoader } from "@/components/shared/WindowLoader";

import { ErrorInDashboard } from "@/components/shared/errorInDashboard";

import { useGetAccount } from "@/utility/hooks/getAccount";
import { AccessGroupsTable } from "@/components/dashboardComponents/accessGroups/accessGroupsTable";

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
        <div className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:access-groups.title")}
              </h2>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {jsx}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

AccessGroups.requireAuth = true;
