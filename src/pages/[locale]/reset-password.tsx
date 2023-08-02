"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { useForm } from "react-hook-form";
import axios from "axios";
import { infoToast } from "@/utility/toasts";
import { navigatorLangDetector } from "@/lib/languageDetector";
import { errorReporter } from "@/utility/error/reporter";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
  "dashboard-page",
  "toast-messages",
  "forms",
  "reset-password-page",
  "image-alt-tags",
]);
export { getStaticPaths, getStaticProps };

export default function ResetPassword() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  const router = useRouter();

  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: searchParams.get("email") || "",
      resetPasswordToken: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const { email, resetPasswordToken, newPassword } = data;
      console.log("data", data);

      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/reset-password`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          resetPasswordToken,
          newPassword,
        },
      };

      let resp = await axios(config);

      infoToast(t("toast-messages:reset-password-success"));

      const detectedLng = navigatorLangDetector();

      router.push(`/${detectedLng}/`);
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <>
      <>
        <Head>
          <title>{t("seo:reset-password-page-seo-title")}</title>
          <meta
            name="description"
            content={t("seo:log-in-page-seo-meta-description")!}
          />
        </Head>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="mx-auto h-10 w-auto"
              src="/kalygo_new_logo-192x192.png"
              alt={t("image-alt-tags:kalygo_new_logo-192x192")}
              width={192}
              height={192}
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {t("reset-password-page:reset-password")}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("forms:email-address")}
                </label>
                <div className="mt-2">
                  <input
                    {...register("email", {
                      required: true,
                      pattern: new RegExp(
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/
                      ),
                    })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("forms:enter-email")!}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      errors["email"] && "ring-red-700 focus:ring-red-500"
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="resetPasswordtoken"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("forms:reset-token")}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    {...register("resetPasswordToken", {
                      required: true,
                    })}
                    id="resetPasswordToken"
                    name="resetPasswordToken"
                    autoComplete="resetPasswordToken"
                    placeholder={t("forms:enter-reset-token")!}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      errors["resetPasswordToken"] &&
                      "ring-red-700 focus:ring-red-500"
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("forms:new-password")!}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    {...register("newPassword", {
                      required: true,
                      minLength: 7,
                    })}
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="newPassword"
                    placeholder={t("forms:minimum-7-characters")!}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      errors["newPassword"] && "ring-red-700 focus:ring-red-500"
                    }`}
                  />
                </div>
              </div>

              <div>
                <button
                  // type="submit"
                  // onClick={() => onSubmit(getValues())}
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {t("reset-password-page:reset")}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              <Link
                href="/"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                {t("reset-password-page:back-to-home")}
              </Link>
            </p>
          </div>
        </div>
      </>
    </>
  );
}
