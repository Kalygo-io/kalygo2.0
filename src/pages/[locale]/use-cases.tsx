"use client";

import Head from "next/head";
import Image from "next/image";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "use-cases-page",
  "image-alt-tags",
  "error",
]);
export { getStaticPaths, getStaticProps };

export default function UseCases() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:use-cases-page-seo-title")}</title>
        <meta
          name="description"
          content={t("seo:use-cases-page-seo-meta-description")!}
        />
      </Head>
      <div className="bg-white h-full">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {t("use-cases-page:use-cases")}
            </h2>
            <Link
              href="/browse-contracts"
              className="hidden text-sm font-semibold text-blue-600 hover:text-blue-500 sm:block"
            >
              {t("use-cases-page:browse-contracts")}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
            <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 border-1 shadow">
              <Image
                src="/money.svg"
                width={1000}
                height={1000}
                alt={t("image-alt-tags:money.svg")}
                className="object-fit object-center opacity-100 group-hover:opacity-50"
              />
              <div
                aria-hidden="true"
                // className="bg-gradient-to-bl from-transparent to-blue-700"
                className="hover:bg-orange-400"
              />
              <div className="flex items-start p-6">
                <div>
                  <h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-md bg-white px-4 py-2 mx-1 text-2xl font-bold text-orange-400 ring-2 ring-inset ring-orange-600/20">
                      <Link href="/browse-contracts">
                        <span className="absolute inset-0" />
                        {t("use-cases-page:escrow")}
                      </Link>
                    </span>
                  </h3>
                  {/* <p
                    aria-hidden="true"
                    className="mt-1 text-sm text-black font-semibold"
                  >
                    {t("use-cases-page:deploy-now")}
                  </p> */}
                </div>
              </div>
            </div>
            <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full border-1 shadow">
              <Image
                src="/club.svg"
                width={1000}
                height={1000}
                alt={t("image-alt-tags:club.svg")}
                className="object-fit object-right opacity-100 group-hover:opacity-50 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                // className="bg-gradient-to-bl from-transparent to-blue-700 opacity-50 sm:absolute sm:inset-0"
                className=""
              />
              <div className="flex items-start p-6 sm:absolute sm:inset-0">
                <div>
                  <h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-md bg-white px-4 py-2 mx-1 text-2xl font-bold text-orange-400 ring-2 ring-inset ring-orange-600/20">
                      <Link href="/browse-contracts">
                        <span className="absolute inset-0" />
                        {t("use-cases-page:membership")}
                      </Link>
                    </span>
                  </h3>
                  {/* <p
                    aria-hidden="true"
                    className="mt-1 text-sm text-black font-semibold"
                  >
                    {t("use-cases-page:manage-powerful-groups")}
                  </p> */}
                </div>
              </div>
            </div>
            <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full border-1 shadow">
              <Image
                priority
                src="/luck.svg"
                width={1000}
                height={1000}
                alt={t("image-alt-tags:luck.svg")!}
                className="object-fit object-center opacity-100 group-hover:opacity-50 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                // className="bg-gradient-to-bl from-transparent to-blue-700 opacity-50 sm:absolute sm:inset-0"
                className=""
              />
              <div className="flex items-start p-6 sm:absolute sm:inset-0">
                <div>
                  <h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-md bg-white px-4 py-2 mx-1 text-2xl font-bold text-orange-400 ring-2 ring-inset ring-orange-600/20">
                      <Link href="/browse-contracts">
                        <span className="absolute inset-0" />
                        {t("use-cases-page:lottery")}
                      </Link>
                    </span>
                  </h3>
                  {/* <p
                    aria-hidden="true"
                    className="mt-1 text-sm text-black font-semibold"
                  >
                    {t("use-cases-page:unbiased-outcomes")}
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/browse-contracts"
              className="block text-sm font-semibold text-blue-600 hover:text-blue-500"
            >
              {t("use-cases-page:browse-contracts")}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
