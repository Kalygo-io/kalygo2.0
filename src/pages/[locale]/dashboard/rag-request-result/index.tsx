"use client";

import Head from "next/head";

import { NextPageContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";

import { Error } from "../../../../components/shared/error";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

import { useEffect, useState } from "react";
import axios from "axios";
import VectorSearch from "@/components/dashboardComponents/vectorSearch";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import RagRequest from "@/components/dashboardComponents/ragRequest";

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

  const ragRequestId = searchParams.get("rag-request-id") || "";
  const { t } = useTranslation();

  const [ragRequest, setRagRequest] = useState<{
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
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/rag/${ragRequestId}`,
          {
            withCredentials: true,
          }
        );

        setRagRequest({
          loading: false,
          val: res.data,
          err: null,
        });
      } catch (e) {
        setRagRequest({
          loading: false,
          val: null,
          err: e,
        });
      }
    }

    fetch();
  }, []);

  let jsx = null;
  if (ragRequest.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (ragRequest.val) {
    jsx = <RagRequest ragRequest={ragRequest.val} />;
  } else {
    jsx = <ErrorInDashboard />;
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
              <h3 className="text-3xl font-bold text-gray-900 whitespace-nowrap truncate">
                {t("dashboard-page:rag-result.title")}
              </h3>
            </div>
          </div>
          <div className="mt-4 flow-root">
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
