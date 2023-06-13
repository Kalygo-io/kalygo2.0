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
  //   SearchFileForm,
  SearchFileWizard,
  SearchSuccess,
  SearchError,
} from "@/components/searchFileComponents";
import { SectionLoader } from "@/components/shared/SectionLoader";
import { WindowLoader } from "@/components/shared/WindowLoader";

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

  const [searchResults, setSearchResultsState] = useState<{
    val: {
      results: string[];
      query: string;
    } | null;
    loading: boolean;
    err: Error | null;
  }>({
    val: null,
    loading: false,
    err: null,
  });

  let jsx = null;
  if (searchResults.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (searchResults.err) {
    jsx = <SearchError />;
  } else if (searchResults.val) {
    jsx = (
      <SearchSuccess
        query={searchResults.val.query}
        results={searchResults.val.results}
        reset={() => {
          setSearchResultsState({
            val: null,
            loading: false,
            err: null,
          });
        }}
      />
    );
  } else {
    jsx = <SearchFileWizard />;
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>{jsx}</LayoutDashboard>
    </>
  );
}

Summarize.requireAuth = true;
