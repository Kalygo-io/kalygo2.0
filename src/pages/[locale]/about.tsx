import React from "react";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
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
        <title>{t("seo:feedback-page-seo-title")}</title>
        <meta
          name="description"
          content={t("seo:feedback-page-seo-meta-description")!}
        />
      </Head>

      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-blue-600">
                  Move at your pace
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Process data according to your preferences
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Introducing Kalygo, your document processing companion. With
                  the world generating an ocean of information daily, it&apos;s
                  easy to get lost in the waves. Kalygo sails in as the
                  game-changing solution that enables you to securely upload
                  your documents and create streamlined, abridged versions of
                  them according to your preferences. Whether you&apos;re a
                  student trying to grasp the essence of an overwhelming amount
                  of study material or a professional seeking to extract the
                  core points from a pile of documents on your virtual desk,
                  Kalygo has got you covered.
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
                <p>
                  Our open-source and cutting-edge technology is tailored to
                  make your life easier and more productive. Kalygo employs
                  advanced tooling that maintains the integrity and critical
                  information of your documents while presenting them in their
                  most digestible formats. It's a revolution in how you interact
                  with your data. Say goodbye to endless scrolling and hello to
                  focused, concise information extraction that propels you
                  towards your goals.
                </p>
                <p className="mt-8">
                  Security and privacy are at the core of Kalygo. We understand
                  that your documents are precious and often sensitive so our
                  robust security measures ensure that your data remains
                  safeguarded at all times. When you use Kalygo, you're not just
                  accessing a world-class document processing tool; you&apos;re
                  joining a community that values and protects your data as much
                  as you do. Kalygo does monetize user data but all the manners
                  in which it does so are made transparent via the term of use
                  and privacy policy.
                </p>
                <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
                  Ready to get started?
                </h2>
                <div className="mt-4 flex">
                  <a
                    href="signup"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Get started
                  </a>
                </div>
                <p className="mt-8">
                  For just $9.99 per month, unlock the power to transform your
                  relationship with documents. There&apos;s no reason not to
                  give Kalygo a try. Take the reins, and experience the magic of
                  concise information at your fingertips. We are confident that
                  once you try Kalygo, it will become an indispensable part of
                  your daily life. Step into the future of document processing
                  with Kalygo and never look back!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
