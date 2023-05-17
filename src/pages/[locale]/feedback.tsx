"use client";

import { useForm } from "react-hook-form";
import Layout1 from "@/layout/layout1";
import Head from "next/head";
import { useRouter } from "next/router";
// import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import languageDetector from "@/lib/languageDetector";

const getStaticProps = makeStaticProps([
  "feedback-page",
  "seo",
  "navbar",
  "common",
  "forms",
  "error",
  "info",
]);
export { getStaticPaths, getStaticProps };

export default function Feedback() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      feedback: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const { feedback } = data;
      console.log("data", data);

      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/feedback/general`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          feedback,
        },
      };

      let resp = await axios(config);

      console.log(resp);

      infoToast(t("toast-messages:the-feedback-is-appreciated"));

      const detectedLng = languageDetector.detect();

      router.push(`/${detectedLng}/`);
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <>
      <Head>
        <title>{t("seo:feedback-page-seo-title")}</title>
        <meta
          name="description"
          content={t("seo:feedback-page-seo-meta-description")!}
        />
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="/logo192.png"
            alt={t("image-alt-tags:logo192.png")}
            width={192}
            height={192}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {t("feedback-page:general-feedback")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="feedback"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("feedback-page:feedback")}
              </label>
              <div className="mt-2">
                <textarea
                  {...register("feedback", {
                    required: true,
                  })}
                  rows={4}
                  name="feedback"
                  id="feedback"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>

            <div>
              <button
                // type="submit"
                // onClick={() => onSubmit(getValues())}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {t("feedback-page:send")}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              href="/"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              {t("feedback-page:back-to-home")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
