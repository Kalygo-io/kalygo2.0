"use client";

import Head from "next/head";

import { NextPageContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import ContractList from "@/components/browseContractsComponents/contractList";

import { Error } from "../../../../components/shared/error";

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
import Summary from "@/components/dashboardComponents/summary";
import { WindowLoader } from "@/components/shared/WindowLoader";

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

  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

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
        // debugger;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/get-summary/${state.summaryId}`,
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
  }, []);

  let jsx = null;
  if (summary.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (summary.val) {
    jsx = <Summary summary={summary.val} />;
  } else {
    jsx = <Error />;
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
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                {t("dashboard-page:summary.title")}
              </h1>
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

Page.requireAuth = true;
