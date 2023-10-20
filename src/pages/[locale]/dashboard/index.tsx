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

import get from "lodash.get";
import { Credits } from "@/components/dashboardComponents/index/credits";

// import { SummariesV2Table } from "@/components/dashboardComponents/summariesV2Table";
import { SummariesV2TableAlt } from "@/components/dashboardComponents/summariesV2TableAlt";
// import { CustomRequestsTable } from "@/components/dashboardComponents/customRequestsTable";
import { CustomRequestsTableAlt } from "@/components/dashboardComponents/customRequestsTableAlt";
import { useGetAccount } from "@/utility/hooks/getAccount";
import { SummariesV3TableAlt } from "@/components/dashboardComponents/summariesV3TableAlt";

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

  const [summariesV2, setSummariesV2] = useState<{
    val: any[];
    loading: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    err: null,
  });

  const [summariesV3, setSummariesV3] = useState<{
    val: any[];
    loading: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    err: null,
  });

  const [customRequests, setCustomRequests] = useState<{
    val: any[];
    loading: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    err: null,
  });

  const { account } = useGetAccount();

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
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/summaries-v2`,
          {
            withCredentials: true,
          }
        );
        setSummariesV2({
          loading: false,
          val: res3.data,
          err: null,
        });

        const res4 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/custom-requests`,
          {
            withCredentials: true,
          }
        );
        setCustomRequests({
          loading: false,
          val: res4.data,
          err: null,
        });

        const res5 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/summaries-v3`,
          {
            withCredentials: true,
          }
        );
        setSummariesV3({
          loading: false,
          val: res5.data,
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
    summaries.val?.length === 0 &&
    vectorSearches.val?.length === 0 &&
    summariesV2.val?.length === 0 &&
    customRequests.val?.length === 0
      ? true
      : false;

  let jsx = null;

  if (
    summaries.loading ||
    vectorSearches.loading ||
    account.loading ||
    summariesV2.loading ||
    customRequests.loading
  ) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (
    summaries.err ||
    summariesV2.err ||
    vectorSearches.err ||
    customRequests.err ||
    account.err
  ) {
    jsx = <ErrorInDashboard />;
  } else if (
    summaries.val?.length > 0 ||
    vectorSearches.val?.length > 0 ||
    summariesV2.val?.length > 0 ||
    customRequests.val?.length > 0
  ) {
    jsx = (
      <>
        {summariesV3.val?.length > 0 && (
          <SummariesV3TableAlt summaries={summariesV3.val} />
        )}

        {summariesV2.val?.length > 0 && (
          <>
            <div className="relative px-4 py-24 sm:p-6 lg:p-12">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            {/* <SummariesV2Table summaries={summariesV2.val} /> */}
            <SummariesV2TableAlt summaries={summariesV2.val} />
          </>
        )}

        {/* {summaries.val?.length > 0 && (
          <>
            <div className="relative px-4 py-24 sm:p-6 lg:p-12">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <SummariesTable summaries={summaries.val} />
          </>
        )} */}

        {customRequests.val?.length > 0 && (
          <>
            <div className="relative px-4 py-24 sm:p-6 lg:p-12">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <CustomRequestsTableAlt customRequests={customRequests.val} />
          </>
        )}
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
        <div className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8">
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
                    {t("dashboard-page:my-results.title")}
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
