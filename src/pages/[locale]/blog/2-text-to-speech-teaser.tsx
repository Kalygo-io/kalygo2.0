import React from "react";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import Layout1a from "@/layout/layout1a";
import Head from "next/head";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "blog",
  "contract-list",
  "error",
]);

export { getStaticPaths, getStaticProps };

export default function ScanningModes() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:text-to-speech-teaser-title")}</title>
        <meta
          name="description"
          content={t("seo:text-to-speech-teaser-description")!}
        />
      </Head>

      <Layout1a>
        <div className="bg-white px-6 py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              {t("blog:text-to-speech-teaser.title")}
            </h1>
            <p className="mt-6 text-xl leading-8"></p>
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="mt-8 max-w-3xl space-y-8 mx-auto">
                <p>{t("blog:text-to-speech-teaser.paragraph-1")}</p>
                <p>{t("blog:text-to-speech-teaser.paragraph-2")}</p>
                <p>{t("blog:text-to-speech-teaser.paragraph-3")}</p>
                <p>{t("blog:text-to-speech-teaser.paragraph-4")}</p>
              </div>
            </div>
          </div>
        </div>
      </Layout1a>
    </>
  );
}
