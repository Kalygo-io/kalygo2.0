"use client";

import { useForm } from "react-hook-form";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts";
import languageDetector, {
  navigatorLangDetector,
} from "@/lib/languageDetector";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export

import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { WindowLoader } from "@/components/shared/WindowLoader";

const products = [
  {
    id: 1,
    name: "Kalygo Premium Subscription",
    price: "$9.99",
    detail1: "w/ 14-day FREE trial",
    detail2: "",
    imageSrc: "/logo192.png",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  // More products...
];

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "sign-up-page",
  "image-alt-tags",
  "forms",
  "error",
  "toast-messages",
]);
export { getStaticPaths, getStaticProps };

export default function Signup() {
  const { t } = useTranslation();

  const [signUpState, setSignUpState] = useState<{
    loading: boolean;
    error: any;
    val: any;
  }>({
    loading: false,
    error: null,
    val: null,
  });

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
      card_name: "",
      card_number: "",
      card_exp: "",
      cvc: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);
      const { email, password, card_number, card_exp, cvc } = data;
      const [exp_month, exp_year] = card_exp.split("/");

      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/subscription-sign-up`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
          exp_month,
          exp_year,
          card_number,
          cvc,
        },
      };

      setSignUpState({
        error: null,
        loading: true,
        val: null,
      });

      let resp = await axios(config);
      console.log(resp);
      infoToast(t("toast-messages:sign-up-success"));
      // const detectedLng = languageDetector.detect();
      setSignUpState({
        error: null,
        loading: false,
        val: null,
      });
      const detectedLng = navigatorLangDetector();
      router.push(`/${detectedLng}/`);
    } catch (e) {
      setSignUpState({
        error: e,
        loading: false,
        val: null,
      });

      errorReporter(e);
    }
  };

  return (
    <>
      <Head>
        <title>{t("seo:subscription-sign-up-page-seo-title")}</title>
        <meta
          name="description"
          content={t("seo:subscription-sign-up-page-seo-meta-description")!}
        />
      </Head>
      <div className="bg-white">
        {/* Background color split screen for large screens */}
        <div
          className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block"
          aria-hidden="true"
        />
        <div
          className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 lg:block"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <h1 className="sr-only">Order information</h1>

          <section
            aria-labelledby="summary-heading"
            className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
          >
            <div className="mx-auto max-w-lg lg:max-w-none">
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
              >
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-start space-x-4 py-6"
                  >
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-20 w-20 flex-none rounded-md object-cover object-center"
                    />
                    <div className="flex-auto space-y-1">
                      <h3>{product.name}</h3>
                      <p className="text-gray-500">{product.detail1}</p>
                      <p className="text-gray-500">{product.detail2}</p>
                    </div>
                    <p className="flex-none text-base font-medium">
                      {product.price}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd>$9.99</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Taxes</dt>
                  <dd>(included)</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">$9.99</dd>
                </div>
              </dl>

              <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                  <div className="mx-auto max-w-lg">
                    <Popover.Button className="flex w-full items-center py-6 font-medium">
                      <span className="mr-auto text-base">Total</span>
                      <span className="mr-2 text-base">$9.99</span>
                      <ChevronUpIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>
                </div>

                <Transition.Root as={Fragment}>
                  <div>
                    <Transition.Child
                      as={Fragment}
                      enter="transition-opacity ease-linear duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-y-full"
                      enterTo="translate-y-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-y-0"
                      leaveTo="translate-y-full"
                    >
                      <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                        <dl className="mx-auto max-w-lg space-y-6">
                          <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Subtotal</dt>
                            <dd>$9.99</dd>
                          </div>

                          <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Taxes</dt>
                            <dd>(included)</dd>
                          </div>
                        </dl>
                      </Popover.Panel>
                    </Transition.Child>
                  </div>
                </Transition.Root>
              </Popover>
            </div>
          </section>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
          >
            <div className="mx-auto max-w-lg lg:max-w-none">
              <section aria-labelledby="contact-info-heading">
                <h2
                  id="contact-info-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Account
                </h2>

                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("email", {
                        required: true,
                        pattern: new RegExp(
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/
                        ),
                      })}
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      className={`block w-full rounded-md border-0 border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm ${
                        errors["email"] && "ring-red-700 focus:ring-red-500"
                      }`}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 7,
                      })}
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="password"
                      className={`block w-full rounded-md border-0 border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm ${
                        errors["password"] && "ring-red-700 focus:ring-red-500"
                      }`}
                    />
                  </div>
                </div>
              </section>

              <section aria-labelledby="payment-heading" className="mt-10">
                <h2
                  id="payment-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Payment
                </h2>

                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                  <div className="col-span-3 sm:col-span-4">
                    <label
                      htmlFor="card_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name on card
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("card_name", {
                          required: true,
                        })}
                        type="text"
                        id="card_name"
                        name="card_name"
                        autoComplete="card_name"
                        className={`block w-full rounded-md border-0 border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm ${
                          errors["card_name"] &&
                          "ring-red-700 focus:ring-red-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-4">
                    <label
                      htmlFor="card_number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("card_number", {
                          required: true,
                          pattern: new RegExp(/^[0-9]+$/),
                        })}
                        type="text"
                        id="card_number"
                        name="card_number"
                        autoComplete="card_number"
                        className={`block w-full rounded-md border-0 border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm ${
                          errors["card_number"] &&
                          "ring-red-700 focus:ring-red-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3">
                    <label
                      htmlFor="card_exp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("card_exp", {
                          required: true,
                          pattern: new RegExp(/[0-9]{2}\/[0-9]{2}/),
                        })}
                        type="text"
                        name="card_exp"
                        id="card_exp"
                        autoComplete="card_exp"
                        className={`block w-full rounded-md border-0 border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm ${
                          errors["card_exp"] &&
                          "ring-red-700 focus:ring-red-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("cvc", {
                          required: true,
                          pattern: new RegExp(/^[0-9]+$/),
                        })}
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="cvc"
                        placeholder="&bull;&bull;&bull;"
                        className={`block w-full rounded-md border-0 border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm ${
                          errors["cvc"] && "ring-red-700 focus:ring-red-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {signUpState.loading && <WindowLoader />}
    </>
  );
}
