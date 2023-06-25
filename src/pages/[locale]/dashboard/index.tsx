"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import ContractList from "@/components/browseContractsComponents/contractList";
import { Error } from "@/components/shared/error";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { useEffect, useState } from "react";
import axios from "axios";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { SummariesTable } from "@/components/dashboardComponents/summariesTable";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";

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

export default function Dashboard() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  const [summaries, setSummaries] = useState<{
    val: any[];
    loading: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    err: null,
  });

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account-summaries`,
          {
            withCredentials: true,
          }
        );

        setSummaries({
          loading: false,
          val: res.data,
          err: null,
        });
      } catch (e) {
        setSummaries({
          loading: false,
          val: [],
          err: e,
        });
      }
    }

    fetch();
  }, []);

  let jsx = null;

  if (summaries.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (summaries.err) {
    jsx = <ErrorInDashboard />;
  } else if (summaries.val) {
    jsx = <SummariesTable summaries={summaries.val} />;
  } else {
    jsx = <>Unknown error</>;
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:index.title")}
              </h2>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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

Dashboard.requireAuth = true;
