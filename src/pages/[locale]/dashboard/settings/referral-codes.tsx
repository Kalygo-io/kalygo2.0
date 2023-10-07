"use client";

import Head from "next/head";

import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { useState } from "react";
import { infoToast, errorToast } from "@/utility/toasts";
import { WindowLoader } from "@/components/shared/WindowLoader";
// import { PurchaseHistoryTable } from "@/components/accountSettingsComponents/purchaseHistoryComponents/purchaseHistory";
import { useReferralCodes } from "@/utility/hooks/useReferralCodes";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { ReferralCodesTable } from "@/components/accountSettingsComponents/referralCodesComponents/referralCodesTable";

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

  const { referralCodes } = useReferralCodes();

  let jsx = null;
  if (referralCodes.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (referralCodes.val) {
    jsx = <ReferralCodesTable referralCodes={referralCodes.val} />;
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
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:settings.referral-codes.title")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {t("dashboard-page:settings.referral-codes.description")}
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
