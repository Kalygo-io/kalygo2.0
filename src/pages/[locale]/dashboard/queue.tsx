"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { useEffect, useState } from "react";
import axios from "axios";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { SummariesTableB } from "@/components/dashboardComponents/summariesTableB";
import { JobList } from "@/components/queueComponents/jobList";
import { viewSummaryQueue } from "@/services/viewSummaryQueue";
import get from "lodash.get";

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

export default function Queue() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  const [jobs, setJobs] = useState<{
    val: any[];
    loading: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    err: null,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const resp = await viewSummaryQueue();
        const activeJobs = get(resp, "data.activeJobs", []);
        setJobs({
          val: activeJobs,
          loading: false,
          err: null,
        });
      } catch (e) {
        setJobs({
          val: jobs.val,
          loading: false,
          err: e,
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetch() {
      try {
        const resp = await viewSummaryQueue();
        const activeJobs = get(resp, "data.activeJobs", []);
        setJobs({
          val: activeJobs,
          loading: false,
          err: null,
        });
      } catch (e) {
        setJobs({
          val: jobs.val,
          loading: false,
          err: e,
        });
      }
    }

    fetch();
  }, []);

  let jsx = null;

  if (jobs.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (jobs.err) {
    jsx = <>Error loading summaries</>;
  } else if (jobs.val) {
    jsx = <JobList jobs={jobs.val} />;
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
                {t("dashboard-page:queue.title")}
              </h2>
            </div>
            <span>{jobs.val?.length > 0 ? "" : ""}</span>
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

Queue.requireAuth = true;
