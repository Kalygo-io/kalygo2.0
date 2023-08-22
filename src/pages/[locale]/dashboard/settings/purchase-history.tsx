"use client";

import Head from "next/head";

import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

import { useState } from "react";
import { infoToast, errorToast } from "@/utility/toasts";
import {
  ChunkingToolError,
  ChunkingToolWizard,
} from "@/components/chunkingToolComponents";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { PaymentRequiredModal } from "@/components/shared/PaymentRequiredModal";
import { useGetAccount } from "@/utility/hooks/getAccount";
import { PurchaseHistoryTable } from "@/components/accountSettingsComponents/purchaseHistoryComponents/purchaseHistory";
import { usePurchaseHistory } from "@/utility/hooks/getPurchaseHistory";

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

export default function PurchaseHistory() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();

  const { purchaseHistory } = usePurchaseHistory();

  let jsx = null;
  jsx = <PurchaseHistoryTable charges={purchaseHistory.val} />;

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
                {t("dashboard-page:settings.purchase-history.title")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {t("dashboard-page:settings.purchase-history.description")}
              </p>
            </div>
          </div>
          {jsx}
        </div>
      </LayoutDashboard>
    </>
  );
}

PurchaseHistory.requireAuth = true;
