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
import { Fragment, useState } from "react";
import { infoToast, errorToast } from "@/utility/toasts";
import {
  SummarizeFileForm,
  SummarySuccess,
  SummaryError,
} from "@/components/summarizeFileComponents";

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

export default function Summarize() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  const [summary, setSummaryState] = useState<{
    val: {
      summary: string[];
      fileName: string;
      originalLength: number;
      condensedLength: number;
    } | null;
    loading: boolean;
    err: Error | null;
  }>({
    val: null,
    loading: false,
    err: null,
  });

  let jsx = null;
  if (summary.loading) {
    jsx = <>Summary Loading</>;
  } else if (summary.err) {
    jsx = <>Successful Error</>;
  } else if (summary.val) {
    jsx = (
      <SummarySuccess
        fileName={summary.val?.fileName}
        summary={summary.val.summary}
        originalLength={summary.val.originalLength}
        condensedLength={summary.val.condensedLength}
        reset={() => {
          setSummaryState({
            val: null,
            loading: false,
            err: null,
          });
        }}
      />
    );
  } else {
    jsx = (
      <SummarizeFileForm
        onSuccess={(resp: {
          summary: string[];
          fileName: string;
          originalLength: number;
          condensedLength: number;
        }) => {
          console.log("onSuccess");
          infoToast("Summary returned successfully");
          setSummaryState({
            val: resp,
            loading: false,
            err: null,
          });
        }}
        onError={() => {
          console.log("onError");
          errorToast("Summary returned successfully");
        }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-description")}</title>
      </Head>
      <LayoutDashboard>{jsx}</LayoutDashboard>
    </>
  );
}

Summarize.requireAuth = true;
