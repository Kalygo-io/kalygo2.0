"use client";

import Head from "next/head";
import Layout1 from "@/layout/layout1";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { Stats } from "@/components/indexComponents/stats";
import { Pricing } from "@/components/indexComponents/pricing";
import { Mailing } from "@/components/indexComponents/mailing";
import { EnterprisePricing } from "@/components/indexComponents/enterprise_pricing";
import { DefaultHero } from "@/components/indexComponents/defaultHero";

const getStaticProps = makeStaticProps([
  "landing-page",
  "seo",
  "navbar",
  "common",
  "error",
  "footer",
  "email-page",
  "common",
  "image-alt-tags",
  "toast-messages",
  "forms",
]);
export { getStaticPaths, getStaticProps };

export default function Home(props: any) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:landing-page-seo-title")}</title>
      </Head>
      <Layout1>
        <DefaultHero />
        <Stats />
        {/* <Pricing /> */}
        <EnterprisePricing />
        <Mailing />
      </Layout1>
    </>
  );
}
