"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { useEffect, useState } from "react";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { useGetAccount } from "@/utility/hooks/getAccount";
import { BuyCreditsWizard } from "@/components/buyCreditsComponents/buyCreditsWizard";

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

export default function BuyCredits() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();
  const { account } = useGetAccount();
  const [showPaymentMethodRequiredModal, setShowPaymentMethodRequiredModal] =
    useState<boolean>(false);

  let jsx = null;

  jsx = <BuyCreditsWizard account={account.val} />;

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
                {t("dashboard-page:buy-credits.title")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {t("dashboard-page:buy-credits.description")}
              </p>
            </div>
          </div>
          {jsx}
        </div>
      </LayoutDashboard>
    </>
  );
}

BuyCredits.requireAuth = true;
