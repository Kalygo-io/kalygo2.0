import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Context } from "react";
import { NextPageContext } from "next";

export const getI18nPaths = (args: any) => {
  console.log("args", args);

  return i18nextConfig.i18n.locales.map((lng: string) => ({
    params: {
      locale: lng,
      // id: "1",
    },
  }));
};

export const getStaticPaths = (args: any) => {
  console.log("--- ___ ---");

  console.log("args", args);

  return {
    fallback: false,
    paths: getI18nPaths(args),
  };
};

export async function getI18nProps(ctx: any, ns = ["common"]) {
  const locale = (ctx?.params as any)?.locale;

  console.log("getI18nProps - locale", locale);

  let props = {
    ...(await serverSideTranslations(locale, ns)),
  };

  return props;
}

export function makeStaticProps(ns: string[] = []) {
  console.log("ns", ns);

  return async function getStaticProps(ctx: NextPageContext) {
    console.log("--- ctx ---", ctx);

    return {
      props: await getI18nProps(ctx, ns),
    };
  };
}
