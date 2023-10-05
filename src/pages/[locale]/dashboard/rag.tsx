"use client";

import Head from "next/head";

import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { Fragment, useEffect, useState } from "react";
import { infoToast, errorToast } from "@/utility/toasts";

import { RagRequestError, RagRequestWizard } from "@/components/ragComponents";

import { WindowLoader } from "@/components/shared/WindowLoader";
import { PaymentRequiredModal } from "@/components/shared/PaymentRequiredModal";
import axios from "axios";
import { useGetAccount } from "@/utility/hooks/getAccount";

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

export default function RAG() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();

  const { account } = useGetAccount();

  const [showPaymentMethodRequiredModal, setShowPaymentMethodRequiredModal] =
    useState<boolean>(false);

  let jsx = null;
  if (showPaymentMethodRequiredModal) {
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
      <RagRequestWizard
        account={account.val}
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
      <LayoutDashboard account={account.val}>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:rag.title")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {t("dashboard-page:rag.description")}
              </p>
            </div>
          </div>
          {jsx}
        </div>
      </LayoutDashboard>
    </>
  );
}

RAG.requireAuth = true;
