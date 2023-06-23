"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import ContractList from "@/components/browseContractsComponents/contractList";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import LinkComponent from "@/components/shared/Link";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { SummariesTableB } from "@/components/dashboardComponents/summariesTableB";

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
    jsx = <>Error loading summaries</>;
  } else if (summaries.val) {
    jsx = <SummariesTableB summaries={summaries.val} />;
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
                {/* {t("dashboard-page:index.title")} */}
                Queue
              </h2>
            </div>
            <span>ETA - 2 minutes 20 seconds</span>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {/* {jsx} */}
                {/*  */}
                <div>
                  <h4 className="sr-only">Status</h4>
                  <p className="text-sm font-medium text-gray-900">
                    Processing File 1 - TadDuvalResume.txt
                  </p>
                  <div className="mt-6" aria-hidden="true">
                    <div className="overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: "37.5%" }}
                      />
                    </div>
                    {/* <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                      <div className="text-blue-600">Copying files</div>
                      <div className="text-center text-blue-600">
                        Migrating database
                      </div>
                      <div className="text-center">Compiling assets</div>
                      <div className="text-right">Deployed</div>
                    </div> */}
                  </div>
                </div>
                {/*  */}
                <br />
                {/*  */}
                <div>
                  <h4 className="sr-only">Status</h4>
                  <p className="text-sm font-medium text-gray-900">
                    Processing File 2 - ExampleContract.pdf
                  </p>
                  <div className="mt-6" aria-hidden="true">
                    <div className="overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: "57.5%" }}
                      />
                    </div>
                    {/* <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                      <div className="text-blue-600">Copying files</div>
                      <div className="text-center text-blue-600">
                        Migrating database
                      </div>
                      <div className="text-center">Compiling assets</div>
                      <div className="text-right">Deployed</div>
                    </div> */}
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

Queue.requireAuth = true;
