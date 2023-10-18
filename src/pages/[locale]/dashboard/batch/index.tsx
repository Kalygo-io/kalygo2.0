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
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/get-batch`,
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
          val: [],
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
  } else if (jobs.val) {
    jsx = <JobsTable jobs={jobs.val} refresh={refresh} account={account.val} />;
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto min-h-screen">
          {jsx}
        </div>
      </LayoutDashboard>
    </>
  );
}

Batch.requireAuth = true;
