"use client";

import Head from "next/head";

import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { SendEmailForm } from "@/components/sendEmailComponents/sendEmailForm";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
  "dashboard-page",
  "toast-messages",
  "forms",
]);
export { getStaticPaths, getStaticProps };

export default function SendEmail() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();

  let jsx = null;
  if (false) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (true) {
    jsx = <SendEmailForm />;
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
                {t("dashboard-page:send-email.title")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {t("dashboard-page:send-email.description")}
              </p>
            </div>
          </div>
          {jsx}
        </div>
      </LayoutDashboard>
    </>
  );
}

SendEmail.requireAuth = true;
