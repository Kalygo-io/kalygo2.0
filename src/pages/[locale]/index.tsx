"use client";

import Head from "next/head";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { useAppContext } from "@/context/AppContext";
import Layout1 from "@/layout/layout1";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { Stats } from "@/components/indexComponents/stats";
import { Pricing } from "@/components/indexComponents/pricing";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mailing } from "@/components/indexComponents/mailing";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { EnterprisePricing } from "@/components/indexComponents/enterprise_pricing";
import IndustriesWeServe from "@/components/indexComponents/industriesWeServe";

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
  const { state, dispatch } = useAppContext();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:landing-page-seo-title")}</title>
      </Head>

      <Layout1>
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 pt-14">
          {/* <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          /> */}

          <div
            ref={ref}
            style={{
              opacity: isInView ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
            id="landing-page-hero"
          >
            <h1 className="title text-7xl font-bold tracking-tight text-gray-900">
              <span className="text-center">
                {t("landing-page:landing-page-headline-prefix")}&nbsp;
              </span>
              <Typewriter
                options={{
                  strings: [
                    t("landing-page:typewriter-word-1"),
                    t("landing-page:typewriter-word-2"),
                    t("landing-page:typewriter-word-3"),
                    t("landing-page:typewriter-word-4"),
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <div className="sub-heading-section mt-6">
              <p className="text-xl leading-8 text-gray-600">
                {t("landing-page:landing-page-subheadline")}
              </p>
              <div className="cta-button">
                <Link
                  href="/signup"
                  className="rounded-md bg-blue-600 px-5 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  &nbsp;{t("landing-page:try-kalygo-for-free")}&nbsp;
                </Link>
              </div>
            </div>
            <img
              src="/Documents.svg"
              alt="Icon of a stack of documents"
              className="image-1"
            />
            <div className="arrow flex justify-center items-center">
              <ArrowRightIcon
                className="icon text-gray-500"
                aria-hidden="true"
              />
            </div>
            <img
              src="/hero-product-photo-v2.png"
              alt="Icon of a stack of documents"
              className="image-2"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
        <Stats />
        <IndustriesWeServe />
        <Pricing />
        <EnterprisePricing />
        <Mailing />
      </Layout1>
    </>
  );
}
