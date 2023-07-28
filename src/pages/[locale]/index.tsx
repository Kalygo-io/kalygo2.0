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
                  className="rounded-md bg-blue-500 mr-2 px-4 py-3.5 text-lg font-semibold text-white shadow-md hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  &nbsp;{t("landing-page:try-kalygo-for-free")}&nbsp;
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-gray-100 px-5 py-3.5 text-lg font-semibold text-black shadow-md hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 flex"
                >
                  {t("landing-page:sign-up-with-google")}&nbsp;
                  <svg
                    className="h-5 w-5 inline relative top-1"
                    aria-hidden="true"
                    viewBox="0 0 186.69 190.5"
                  >
                    <g transform="translate(1184.583 765.171)">
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                        fill="#4285f4"
                      />
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                        fill="#34a853"
                      />
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                        fill="#fbbc05"
                      />
                      <path
                        d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                        fill="#ea4335"
                        clipPath="none"
                        mask="none"
                      />
                    </g>
                  </svg>
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
