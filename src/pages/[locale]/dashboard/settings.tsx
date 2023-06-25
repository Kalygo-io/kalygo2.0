"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import ContractList from "@/components/browseContractsComponents/contractList";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

import { UserCircleIcon } from "@heroicons/react/24/outline";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { Fragment, useEffect, useState } from "react";
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

  const [account, setAccount] = useState<{
    val: {
      email: string;
      firstName: string;
      lastName: string;
      subscriptionPlan: string;
      subscriptions: any[];
    } | null;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: true,
    err: null,
  });

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

    console.log("account details", account);
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
        <Plan
          account={account.val!}
          cb={() => {
            fetch();
          }}
        />
        <Divider />
        <Payment
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
