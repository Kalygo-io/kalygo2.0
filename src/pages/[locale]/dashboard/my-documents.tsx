"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { Fragment, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";

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

export default function MyDocuments() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto min-h-screen">
          File Browser Here
        </div>
      </LayoutDashboard>
    </>
  );
}

MyDocuments.requireAuth = true;
