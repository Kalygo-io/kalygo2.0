import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import LayoutDashboard from "@/layout/layoutDashboard";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { AccountOverview } from "@/components/adminComponents/accountOverview/index";
import { getAccountsFactory } from "@/serviceFactory/getAccountsFactory";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { ColumnDirection } from "@/types/ColumnDirection";
import { AccountTableColumns } from "@/types/AccountTableColumns";
import { getAccountByIdFactory } from "@/serviceFactory/getAccountByIdFactory";
import { useRouter } from "next/router";

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

export default function AccountOverviewPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const accountId = searchParams.get("account-id") || "";

  const [account, setAccount] = useState<{
    loading: boolean;
    val: any;
    err: any;
  }>({
    loading: true,
    val: null,
    err: null,
  });

  useEffect(() => {
    async function getAccount() {
      try {
        const getAccountRequest = getAccountByIdFactory(accountId);
        const getAccountResponse = await getAccountRequest;
        console.log("getAccountResponse", getAccountResponse);

        setAccount({
          loading: false,
          val: getAccountResponse?.data,
          err: null,
        });
      } catch (e) {
        console.error(e);
        setAccount({
          loading: false,
          val: null,
          err: e,
        });
      }
    }
    getAccount();
  }, []);

  let jsx = null;
  if (account.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (account.val) {
    jsx = <AccountOverview account={account.val} />;
  } else {
    jsx = <ErrorInDashboard />;
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="p-6 lg:p-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:admin.account.title")}
              </h2>
            </div>
          </div>
          <div className="mt-0 flow-root">{jsx}</div>
        </div>
      </LayoutDashboard>
    </>
  );
}

AccountOverviewPage.requireAdmin = true;
