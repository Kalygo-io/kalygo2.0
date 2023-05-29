"use client";

import {
  AiFillCloseCircle,
  AiOutlineCheck,
  AiOutlineException,
} from "react-icons/ai";
import { useRouter } from "next/router";
import Head from "next/head";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { useEffect, useState } from "react";
import axios from "axios";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "verify-email-page",
  "image-alt-tags",
  "error",
]);
export { getStaticPaths, getStaticProps };

export default function VerifyEmail() {
  const router = useRouter();

  const [state, setState] = useState<{
    loading: boolean;
    error: any;
    val: any;
  }>({
    loading: true,
    error: null,
    val: null,
  });

  const { t } = useTranslation();

  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);

  const email = searchParams.get("email") || "";
  const emailVerificationToken =
    searchParams.get("email-verification-token") || "";

  useEffect(() => {
    async function fetch() {
      try {
        // setState({
        //   loading: true,
        //   val: null,
        //   error: null,
        // });

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/verify-account`,
          {
            email,
            emailVerificationToken,
          }
        );

        setState({
          loading: false,
          val: res,
          error: null,
        });
      } catch (e) {
        setState({
          loading: false,
          val: null,
          error: e,
        });
      }
    }

    fetch();
  }, []);

  return (
    <>
      <Head>
        <title>{t("seo:email-verification-page-seo-title")}</title>
        <meta
          name="description"
          content={t("seo:email-verification-page-seo-meta-description")!}
        />
      </Head>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        {state.error ? (
          <div className="text-center">
            <div className="flex items-center justify-center">
              <AiFillCloseCircle size={32} color="red" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t("verify-email-page:error-occurred")}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {t("verify-email-page:we-will-be-in-touch")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {t("verify-email-page:back-to-home")}
              </Link>
            </div>
          </div>
        ) : state.loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center">
              <AiOutlineCheck color="green" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t("verify-email-page:you-are-verified")}
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {t("verify-email-page:back-to-home")}
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
