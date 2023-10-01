"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { useEffect, useState } from "react";
import axios from "axios";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import LayoutDashboardNoAdmin from "@/layout/layoutDashboardNoAdmin";
import { UnauthorizedErrorInDashboard } from "@/components/shared/unauthorizedErrorInDashboard";
import { Prompt } from "@/components/dashboardComponents/prompt";

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
  const recordId = searchParams.get("prompt-id") || "";
  const { t } = useTranslation();
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
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/get-public-prompt/${recordId}`
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
    jsx = <Prompt prompt={record.val} showSharing={false} />;
  } else {
    if (record?.err?.response?.status === 403) {
      jsx = <UnauthorizedErrorInDashboard />;
    } else {
      jsx = <ErrorInDashboard />;
    }
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboardNoAdmin>{jsx}</LayoutDashboardNoAdmin>
    </>
  );
}
