"use client";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import Layout1 from "@/layout/layout1";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { Stats } from "@/components/indexComponents/stats";
import { Pricing } from "@/components/indexComponents/pricing";

const getStaticProps = makeStaticProps([
  "landing-page",
  "seo",
  "navbar",
  "common",
  "error",
  "footer",
]);
export { getStaticPaths, getStaticProps };

export default function Home(props: any) {
  const { state, dispatch } = useAppContext();

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:landing-page-seo-title")}</title>
      </Head>

      <Layout1>
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                {t("landing-page:landing-page-headline")}
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  {t("landing-page:landing-page-subheadline")}
                </p>
                <div className="mt-10 flex items-center gap-x-2">
                  <Link
                    href="/signup"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {t("landing-page:sign-up")}&nbsp;&nbsp;
                    <small>{t("landing-page:its-free")}</small>
                  </Link>
                  {/* <Link
                    href="/login"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {t("landing-page:log-in")}
                  </Link> */}
                </div>
              </div>
              <Image
                src="/logo.svg"
                width={512}
                height={512}
                alt="Kalygo's logo"
                className="mt-10 aspect-[2/2] w-full max-w-lg rounded-2xl object-fit sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
        <Stats />
        <Pricing />
      </Layout1>
    </>
  );
}
