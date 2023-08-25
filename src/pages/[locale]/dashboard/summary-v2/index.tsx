"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

import { useEffect, useState } from "react";
import axios from "axios";
import SummaryV2 from "@/components/dashboardComponents/summaryV2";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { useGetAccountWithAccessGroups } from "@/utility/hooks/getAccountWithAccessGroups";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
  "dashboard-page",
  "toast-messages",
  "id",
]);
export { getStaticPaths, getStaticProps };

export default function Page() {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const summaryV2Id = searchParams.get("summary-v2-id") || "";
  const { t } = useTranslation();
  const { account, refresh, refreshCount } = useGetAccountWithAccessGroups();
  const [summary, setSummary] = useState<{
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
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/get-summary-v2/${summaryV2Id}`,
          {
            withCredentials: true,
          }
        );

        setSummary({
          loading: false,
          val: res.data,
          err: null,
        });
      } catch (e) {
        setSummary({
          loading: false,
          val: null,
          err: e,
        });
      }
    }

    fetch();
  }, [refreshCount]);

  let jsx = null;
  if (summary.loading || account.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (summary.val && account.val) {
    jsx = (
      <SummaryV2
        summary={summary.val}
        account={account.val}
        refresh={refresh}
        refreshCount={refreshCount}
      />
    );
  } else {
    jsx = <ErrorInDashboard />;
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="p-4 pb-0 sm:p-6 sm:pb-0 lg:p-8 lg:pb-0">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                {t("dashboard-page:summary.title")}
              </h1>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="inline-block min-w-full py-2 align-middle">
              {jsx}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

Page.requireAuth = true;
