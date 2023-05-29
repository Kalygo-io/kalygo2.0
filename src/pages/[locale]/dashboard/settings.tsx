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

export default function Settings() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  const [account, setAccount] = useState<{
    val: {
      email: string;
      firstName: string;
      lastName: string;
    } | null;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: true,
    err: null,
  });

  useEffect(() => {
    console.log("Settings");

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

    fetch();
  }, []);

  let jsx = null;
  if (account.loading) {
    jsx = <>Account Loading</>;
  } else if (account.err) {
    jsx = <>Error</>;
  } else if (account.val) {
    jsx = (
      <>
        <Personal account={account.val!} />
        <div className="relative mx-4 sm:mx-6 lg:mx-8">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          {/* <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-gray-500">
              Continue
            </span>
          </div> */}
        </div>
        <Payment />
        {/* <ChangePassword /> */}
        {/* <DeleteAccount /> */}
      </>
    );
  } else {
    jsx = <>Unknown Error</>;
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-description")}</title>
      </Head>
      <LayoutDashboard>{jsx}</LayoutDashboard>
    </>
  );
}

Settings.requireAuth = true;
