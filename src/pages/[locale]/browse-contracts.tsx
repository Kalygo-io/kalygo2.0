"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Layout1 from "@/layout/layout1";
import ContractList from "@/components/browseContractsComponents/contractList";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
]);
export { getStaticPaths, getStaticProps };

export default function Home() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:browse-contracts-page-seo-title")}</title>
      </Head>

      <Layout1>
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:px-8">
            <ContractList />
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
      </Layout1>
    </>
  );
}
