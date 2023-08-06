"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Personal } from "@/components/accountSettingsComponents/personal";
// import ChangePassword from "@/components/accountSettingsComponents/resetPassword";
// import DeleteAccount from "@/components/accountSettingsComponents/deleteAccount";
import { getAccount } from "@/services/getAccount";
import { Payment } from "@/components/accountSettingsComponents/payment";
import { SectionLoader } from "@/components/shared/SectionLoader";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { Plan } from "@/components/accountSettingsComponents/plan";
import { DeleteAccount } from "@/components/accountSettingsComponents/deleteAccount";
import { ChangePassword } from "@/components/accountSettingsComponents/changePassword";
import { Divider } from "@/components/shared/Divider";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { FreeCredits } from "@/components/accountSettingsComponents/freeCredits";
import get from "lodash.get";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
  "dashboard-page",
  "toast-messages",
  "image-alt-tags",
]);
export { getStaticPaths, getStaticProps };

export default function Settings() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();
  const router = useRouter();
  const { asPath } = router;

  const [account, setAccount] = useState<{
    val: {
      email: string;
      firstName: string;
      lastName: string;
      subscriptionPlan: string;
      subscriptions: any[];
      summaryCredits: number;
      vectorSearchCredits: number;
      customRequestCredits: number;
    } | null;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: true,
    err: null,
  });

  useEffect(() => {
    if (account.val) {
      const hash = asPath?.split("#")[1];
      const dashboardStickyTopNavEl = document.getElementById(
        "dashboard-sticky-top-nav"
      );
      const paymentSectionEl = document.getElementById(hash);
      paymentSectionEl &&
        window.scrollTo(
          paymentSectionEl.offsetLeft,
          paymentSectionEl.offsetTop -
            get(dashboardStickyTopNavEl, "clientHeight", 0)
        );
    }
  }, [asPath, account.val]);

  async function fetch() {
    getAccount(t, (val: any, err: any) => {
      if (err) {
        setAccount({
          val: null,
          loading: false,
          err: err,
        });
      } else {
        setAccount({
          val: val,
          loading: false,
          err: null,
        });
      }
    });
  }

  useEffect(() => {
    fetch();
  }, []);

  let jsx = null;
  if (account.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (account.err) {
    jsx = <ErrorInDashboard />;
  } else if (account.val) {
    jsx = (
      <>
        <Personal account={account.val!} />
        <Divider />
        <FreeCredits account={account.val!} />
        <Divider />
        {/* <Plan
          account={account.val!}
          cb={() => {
            fetch();
          }}
        /> */}
        {/* <Divider /> */}
        <Payment
          id="payment-section"
          cb={() => {
            fetch();
          }}
        />
        <Divider />
        {/* <ChangePassword /> */}
        <DeleteAccount />
      </>
    );
  } else {
    jsx = (
      <div className="text-center">{t("dashboard-page:unknown-error")}</div>
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

Settings.requireAuth = true;
