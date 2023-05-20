"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import Layout1 from "@/layout/layout1";
import ContractList from "@/components/browseContractsComponents/contractList";

import { useTranslation } from "next-i18next";
// import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export

// const getStaticProps = makeStaticProps([
//   "seo",
//   "navbar",
//   "common",
//   "contract-list",
//   "error",
// ]);
// export { getStaticPaths, getStaticProps };

export default function Dashboard() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Layout1>
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:px-8">
            Protected
          </div>
        </div>
      </Layout1>
    </>
  );
}

Dashboard.requireAuth = true;
