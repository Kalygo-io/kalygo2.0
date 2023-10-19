"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { Fragment, useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { useGetAccount } from "@/utility/hooks/getAccount";
import axios from "axios";
import { JobsTable } from "@/components/dashboardComponents/batch/jobsTable";
import { SummariesV3TableAlt } from "@/components/commonComponents/tables/summariesV3TableAlt";

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

export default function Batch() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();
  const router = useRouter();

  const [jobs, setJobs] = useState<{
    val: Record<string, any[]>;
    loading: boolean;
    err: any;
  }>({
    val: {},
    loading: true,
    err: null,
  });

  const { account } = useGetAccount();
  const [refreshCount, refresh] = useState<number>(0);

  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const batchId = searchParams.get("batch-id") || "";

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/get-batch-of-jobs/${batchId}`,
          {
            withCredentials: true,
          }
        );

        setJobs({
          loading: false,
          val: res.data,
          err: null,
        });
      } catch (e) {
        setJobs({
          loading: false,
          val: {},
          err: e,
        });
      }
    }

    fetch();
  }, [refreshCount]);

  let jsx = null;

  if (jobs.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (jobs.err) {
    jsx = <ErrorInDashboard />;
  } else if (Object.keys(jobs.val).length > 0) {
    jsx = (
      <>
        <SummariesV3TableAlt summaries={jobs.val?.summaryV3} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:batch.title")}
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                {t("dashboard-page:batch.description")}
              </p>
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

Batch.requireAuth = true;
