"use client";

import { useForm } from "react-hook-form";
import Layout1 from "@/layout/layout1";
import Head from "next/head";

import { useRouter } from "next/router";
// import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import { errorReporter } from "@/utility/error/reporter";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

import { GoogleLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import languageDetector, {
  navigatorLangDetector,
} from "@/lib/languageDetector";

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

      console.log("resp", resp);

      // const detectedLng = languageDetector.detect();
      const detectedLng = navigatorLangDetector();

      router.push(`/${detectedLng}/dashboard`);
    } catch (e) {
      errorReporter(e);
    }
  };

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
            src="/logo192.png"
            alt={t("image-alt-tags:logo192.png")}
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
                <input
                  {...register("password", {
                    required: true,
                    minLength: 7,
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={t("forms:enter-password")!}
                  className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors["password"] && "ring-red-700 focus:ring-red-500"
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
                {t("log-in-page:log-in")}
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
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

            <div className="mt-6 grid grid-cols-2 gap-4">
            <GoogleLogin
                text="signin_with"
                onSuccess={(credentialResponse) => {
                  console.log("CREDENTIAL RESPONSE = ", credentialResponse);
                  const { credential } = credentialResponse;
                  const payload = credential ? decodeJwt(credential) : undefined;
                  if (payload) {
                    console.log("PAYLOAD = ", payload);
                    axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/google-log-in`, {}, {
                      headers: {
                        Authorization: `Bearer ${credential}`
                      },
                      withCredentials: true,
                    }).then( response => {
                      console.log(response);
                      const detectedLng = navigatorLangDetector();
                      router.push(`/${detectedLng}/dashboard`);
                    })
                      .catch(err => console.log(err));
                  }
                }}
                onError={() => {
                  console.log('Signup failed');
                }}
              />
              {/* <button
                onClick={() => {}}
                className="flex w-full items-center justify-center gap-3 rounded-md opacity-20 bg-[grey] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 48 48">
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </svg>
                <span className="text-sm font-semibold leading-6">Google</span>
              </button> */}
              <button
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
              </button>
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
