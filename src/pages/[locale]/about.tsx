import React from "react";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";
import Layout1 from "@/layout/layout1";
import Layout1a from "@/layout/layout1a";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "about",
  "common",
  "contract-list",
  "error",
]);
export { getStaticPaths, getStaticProps };

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:about-page-title")}</title>
        <meta name="description" content={t("seo:about-page-description")!} />
      </Head>

      <Layout1a>
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 pt-48 lg:overflow-visible lg:px-0">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
                    {t("about:title")}
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    {t("about:paragraph-1")}
                  </p>
                </div>
              </div>
            </div>
            <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
              <img
                className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src="/about-page-product-photo.png"
                alt="kalygo-product-photo"
              />
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p>{t("about:paragraph-2")}</p>
                  <p className="mt-8">{t("about:paragraph-3")}</p>
                  <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
                    {t("about:ready-to-get-started")}
                  </h2>
                  <div className="mt-4 flex">
                    <a
                      href="/signup"
                      className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      {t("about:get-started")}
                    </a>
                  </div>
                  <p className="mt-8">{t("about:paragraph-4")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout1a>
    </>
  );
}
