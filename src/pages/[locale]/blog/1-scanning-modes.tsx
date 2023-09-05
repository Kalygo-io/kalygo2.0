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
        <title>{t("seo:scanning-modes-blog-article-title")}</title>
        <meta
          name="description"
          content={t("seo:scanning-modes-blog-article-description")!}
        />
      </Head>

      <Layout1a>
        <div className="bg-white px-6 py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              {t("blog:scanning-modes.title")}
            </h1>
            <p className="mt-6 text-xl leading-8"></p>
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {t("blog:scanning-modes.toc")}
              </h2>
              <ul className="mt-2">
                <li>1. {t("blog:scanning-modes.mode-1")}</li>
                <li>2. {t("blog:scanning-modes.mode-2")}</li>
                <li>3. {t("blog:scanning-modes.mode-3")}</li>
                <li>4. {t("blog:scanning-modes.mode-4")}</li>
              </ul>

              <ul role="list" className="mt-8 max-w-3xl space-y-8 mx-auto">
                <li>
                  <span>
                    <strong className="font-semibold text-gray-900">1.</strong>{" "}
                  </span>
                  <b>{t("blog:scanning-modes.mode-1")}</b> -{" "}
                  {t("blog:scanning-modes.mode-1-description")}{" "}
                  <b>{t("blog:scanning-modes.mode-1-emphasis")}</b>
                </li>
                <li>
                  <span>
                    <strong className="font-semibold text-gray-900">2.</strong>{" "}
                  </span>
                  <b>{t("blog:scanning-modes.mode-2")}</b> -{" "}
                  {t("blog:scanning-modes.mode-2-description")}{" "}
                  <b>{t("blog:scanning-modes.mode-2-emphasis")}</b>
                </li>
                <li>
                  <span>
                    <strong className="font-semibold text-gray-900">3.</strong>{" "}
                  </span>
                  <b>{t("blog:scanning-modes.mode-3")}</b> -{" "}
                  {t("blog:scanning-modes.mode-3-description")}{" "}
                  <b>{t("blog:scanning-modes.mode-3-emphasis")}</b>
                </li>
                <li>
                  <span>
                    <strong className="font-semibold text-gray-900">4.</strong>{" "}
                  </span>
                  <b>{t("blog:scanning-modes.mode-4")}</b> -{" "}
                  {t("blog:scanning-modes.mode-4-description")}{" "}
                  <b>{t("blog:scanning-modes.mode-4-emphasis")}</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layout1a>
    </>
  );
}
