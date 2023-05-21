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
import { Fragment, useState } from "react";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
  "dashboard-page",
]);
export { getStaticPaths, getStaticProps };

export default function Dashboard() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-description")}</title>
      </Head>
      <LayoutDashboard>
        <div className="px-4 sm:px-6 lg:px-8">Settings</div>
      </LayoutDashboard>
    </>
  );
}

Dashboard.requireAuth = true;
