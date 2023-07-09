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
} from "@/components/searchFileComponentsV2";
import { SectionLoader } from "@/components/shared/SectionLoader";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { PaymentRequiredModal } from "@/components/shared/PaymentRequiredModal";

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

export default function VectorSearchV2() {
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

  const [showPaymentMethodRequiredModal, setShowPaymentMethodRequiredModal] =
    useState<boolean>(false);

  console.log("showPaymentMethodRequiredModal", showPaymentMethodRequiredModal);

  let jsx = null;
  if (searchResults.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (searchResults.err) {
    jsx = <SearchError />;
  } else if (showPaymentMethodRequiredModal) {
    jsx = (
      <PaymentRequiredModal
        isOpen={showPaymentMethodRequiredModal}
        setIsOpen={(isOpen) => {
          setShowPaymentMethodRequiredModal(isOpen);
        }}
      />
    );
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
    jsx = (
      <SearchFileWizard
        setShowPaymentMethodRequiredModal={(showModal: boolean) => {
          setShowPaymentMethodRequiredModal(showModal);
        }}
      />
    );
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

VectorSearchV2.requireAuth = true;
