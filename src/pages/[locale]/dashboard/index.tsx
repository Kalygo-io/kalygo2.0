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
import { VectorSearchesTable } from "@/components/dashboardComponents/vectorSearchesTable";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { PlusIcon } from "@heroicons/react/24/outline";
import get from "lodash.get";
import { Credits } from "@/components/dashboardComponents/index/credits";
import { PaymentRequiredModal } from "@/components/shared/PaymentRequiredModal";

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

  const [vectorSearches, setVectorSearches] = useState<{
    val: any[];
    loading: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    err: null,
  });

  const [account, setAccount] = useState<{
    val: any;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: true,
    err: null,
  });

  useEffect(() => {
    async function fetch() {
      try {
        const res1 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account-summaries`,
          {
            withCredentials: true,
          }
        );

        setSummaries({
          loading: false,
          val: res1.data,
          err: null,
        });

        const res2 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/vector-searches`,
          {
            withCredentials: true,
          }
        );

        setVectorSearches({
          loading: false,
          val: res2.data,
          err: null,
        });

        const res3 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account`,
          {
            withCredentials: true,
          }
        );

        setAccount({
          loading: false,
          val: res3.data,
          err: null,
        });
      } catch (e) {
        setSummaries({
          loading: false,
          val: [],
          err: e,
        });

        setVectorSearches({
          loading: false,
          val: [],
          err: e,
        });
      }
    }

    fetch();
  }, []);

  const isWelcomeUI =
    summaries.val &&
    vectorSearches.val &&
    summaries.val.length === 0 &&
    vectorSearches.val.length === 0
      ? true
      : false;

  let jsx = null;

  if (summaries.loading || vectorSearches.loading || account.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (summaries.err || vectorSearches.err || account.err) {
    jsx = <ErrorInDashboard />;
  } else if (
    summaries.val &&
    vectorSearches.val &&
    (summaries.val.length > 0 || vectorSearches.val.length > 0)
  ) {
    jsx = (
      <>
        <SummariesTable summaries={summaries.val} />
        <div className="relative px-4 py-24 sm:p-6 lg:p-12">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>
        <VectorSearchesTable vectorSearches={vectorSearches.val} />
      </>
    );
  } else if (isWelcomeUI) {
    jsx = (
      <>
        <Credits account={account.val!} />
      </>
    );
  } else {
    jsx = <>Unknown error</>;
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard account={account.val}>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              {!summaries.loading &&
                !vectorSearches.loading &&
                !account.loading &&
                (isWelcomeUI ? (
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {t("dashboard-page:welcome-to-kalygo")}{" "}
                    {`${get(account.val, "email", "")}!`}
                  </h2>
                ) : (
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {t("dashboard-page:index.title")}
                  </h2>
                ))}
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
