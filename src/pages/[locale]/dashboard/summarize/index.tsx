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
import { Fragment, useEffect, useState } from "react";
import { infoToast, errorToast } from "@/utility/toasts";
import {
  SummarizeFileForm,
  SummaryError,
} from "@/components/summarizeFileComponents";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { PaymentRequiredModal } from "@/components/shared/PaymentRequiredModal";
import axios from "axios";

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
  const router = useRouter();
  const { t } = useTranslation();

  const [account, setAccount] = useState<{
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
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account`,
        {
          withCredentials: true,
        }
      );

      setAccount({
        loading: false,
        val: res.data,
        err: null,
      });
    }

    fetch();
  }, []);

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

  const [showPaymentMethodRequiredModal, setShowPaymentMethodRequiredModal] =
    useState<boolean>(false);

  let jsx = null;
  if (summary.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (summary.err) {
    jsx = <SummaryError />;
  } else if (showPaymentMethodRequiredModal) {
    jsx = (
      <PaymentRequiredModal
        isOpen={showPaymentMethodRequiredModal}
        setIsOpen={(isOpen) => {
          setShowPaymentMethodRequiredModal(isOpen);
        }}
      />
    );
  } else {
    jsx = (
      <SummarizeFileForm
        setShowPaymentMethodRequiredModal={(showModal: boolean) => {
          setShowPaymentMethodRequiredModal(showModal);
        }}
        onSuccess={(resp: {
          summary: string[];
          fileName: string;
          originalLength: number;
          condensedLength: number;
        }) => {
          infoToast(t("toast-messages:summary-returned-successfully"));
          setSummaryState({
            val: resp,
            loading: false,
            err: null,
          });
        }}
        setSummaryState={setSummaryState}
        onError={(err) => {
          setSummaryState({
            val: null,
            loading: false,
            err: err,
          });

          console.log("onError");
        }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard account={account.val}>{jsx}</LayoutDashboard>
    </>
  );
}

Summarize.requireAuth = true;
