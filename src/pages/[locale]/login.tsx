"use client";

import { useForm } from "react-hook-form";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { errorReporter } from "@/utility/error/reporter";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { isAuthedFactory } from "@/serviceFactory/isAuthedFactory";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import languageDetector, {
  navigatorLangDetector,
} from "@/lib/languageDetector";
import { useEffect } from "react";
import { PasswordInput } from "@/components/forms/loginForm/passwordInput";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "log-in-page",
  "image-alt-tags",
  "forms",
  "error",
]);
export { getStaticPaths, getStaticProps };

export default function Signin() {
  const { t } = useTranslation();

  useEffect(() => {
    async function isAuthed() {
      try {
        const isAuthedRequest = isAuthedFactory();
        const isAuthedResponse = await isAuthedRequest;
        console.log("isAuthedResponse", isAuthedResponse);
        const detectedLng = navigatorLangDetector();
        router.push(`/${detectedLng}/dashboard`);
      } catch (e) {
        console.log("isAuthed FALSE");
      }
    }

    isAuthed();
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const { access_token } = credentialResponse;

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/google-log-in`,
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
            withCredentials: true,
          }
        );
        const detectedLng = navigatorLangDetector();
        router.push(`/${detectedLng}/dashboard`);
      } catch (e) {
        errorReporter(e);
      }
    },
    onError: () => {
      const err = new Error("GOOGLE_SIGNUP_ERROR");
      errorReporter(err);
    },
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;

      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/log-in`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
        withCredentials: true,
      };

      let resp = await axios(config);

      // const detectedLng = languageDetector.detect();
      const detectedLng = navigatorLangDetector();

      router.push(`/${detectedLng}/dashboard`);
    } catch (e) {
      errorReporter(e);
    }
  };

  const locale = router.query.locale;

  return (
    <>
      <Head>
        <title>{t("seo:log-in-page-seo-title")}</title>
        <meta
          name="description"
          content={t("seo:log-in-page-seo-meta-description")!}
        />
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="/kalygo_new_logo-192x192_dark_blue.png"
            alt={t("image-alt-tags:kalygo_new_logo-192x192")}
            width={192}
            height={192}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {t("log-in-page:log-in")}
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
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("forms:password")}
                </label>
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    {t("forms:forgot-password")}
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <PasswordInput
                  t={t}
                  errors={errors}
                  register={register("password", {
                    required: true,
                    minLength: 7,
                  })}
                />
              </div>
            </div>

            <div>
              <button className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                {t("log-in-page:log-in")}
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-500">
                  {t("log-in-page:or-continue-with")}{" "}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <button
                onClick={() => googleLogin()}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-[black] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F] hover:bg-[grey]"
              >
                <svg
                  className="h-5 w-5"
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
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>
              {/* <button
                onClick={() => {}}
                className="flex w-full items-center justify-center gap-3 rounded-md opacity-20 bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span className="text-sm font-semibold leading-6">Twitter</span>
              </button> */}
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            {t("log-in-page:not-a-member")}{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              {t("log-in-page:sign-up")}
            </Link>
          </p>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              href="/"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              {t("log-in-page:back-to-home")} &rarr;
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
