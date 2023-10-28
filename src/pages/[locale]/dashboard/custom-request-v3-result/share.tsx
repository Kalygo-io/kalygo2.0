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
import LayoutDashboardNoAdmin from "@/layout/layoutDashboardNoAdmin";
import { UnauthorizedErrorInDashboard } from "@/components/shared/unauthorizedErrorInDashboard";
import CustomRequestV3 from "@/components/dashboardComponents/customRequestV3";

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
  const recordId = searchParams.get("custom-request-v3-id") || "";
  const { t } = useTranslation();
  //   const { account, refresh, refreshCount } = useGetAccountWithAccessGroups();
  const [record, setRecord] = useState<{
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
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/get-public-custom-request-v3/${recordId}`
        );

        setRecord({
          loading: false,
          val: res.data,
          err: null,
        });
      } catch (e) {
        setRecord({
          loading: false,
          val: null,
          err: e,
        });
      }
    }

    fetch();
  }, []);

  let jsx = null;
  if (record.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (record.val) {
    jsx = <CustomRequestV3 customRequest={record.val} />;
  } else {
    console.log("--- --- ---", record.err);
    if (record?.err?.response?.status === 403) {
      jsx = <UnauthorizedErrorInDashboard />;
    } else {
      jsx = <ErrorInDashboard />;
    }
  }

  console.log("---");

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboardNoAdmin>{jsx}</LayoutDashboardNoAdmin>
    </>
  );
}
