import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Context } from "react";
import { NextPageContext } from "next";

export const getI18nPaths = (args: any) => {
  // console.log("args", args);

  return i18nextConfig.i18n.locales.map((lng: string) => ({
    params: {
      locale: lng,
    },
  }));
};

export const getStaticPaths = (args: any) => {
  return {
    fallback: false,
    paths: getI18nPaths(args),
  };
};

export async function getI18nProps(ctx: any, ns = ["common"]) {
  const locale = (ctx?.params as any)?.locale;

  // console.log("getI18nProps - locale", locale);

  let props = {
    ...(await serverSideTranslations(locale, ns)),
  };

  return props;
}

export function makeStaticProps(ns: string[] = []) {
  return async function getStaticProps(ctx: NextPageContext) {
    return {
      props: await getI18nProps(ctx, ns),
    };
  };
}
