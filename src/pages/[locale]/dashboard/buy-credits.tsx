"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import ContractList from "@/components/browseContractsComponents/contractList";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { FaCcStripe } from "react-icons/fa6";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { buyCreditsFactory } from "@/serviceFactory/buyCreditsFactory";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { Fragment, useState } from "react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { errorReporter } from "@/utility/error/reporter";
import {
  calculateFees,
  calculateTotal,
} from "@/utility/pricing/calculatePricing";
import { infoToast } from "@/utility/toasts";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
  "dashboard-page",
  "toast-messages",
]);
export { getStaticPaths, getStaticProps };

const creditAmountPresets = [
  {
    id: 1,
    title: "500 credits",
    description: "~1,039 pages with GPT-3 & ~40 pages with GPT-4",
    creditsAmount: 500,
    price: "$8.17",
  },
  {
    id: 2,
    title: "1,000 credits",
    description: "~2,078 pages with GPT-3 & ~81 pages with GPT-4",
    creditsAmount: 1000,
    price: "$15.88",
  },
  {
    id: 3,
    title: "Custom amount",
    description: "",
    creditsAmount: -1,
    price: "TBD",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BuyCredits() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      card_number: "",
      name: "",
      exp_date: "",
      cvc: "",
      credits: 1000,
      selectedCreditAmountPreset: {
        id: 2,
        title: "Custom",
        price: "Flexible amount",
      },
      saveCard: false,
    },
  });

  const creditAmountPreset = watch("selectedCreditAmountPreset");
  const credits = watch("credits");

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);
      console.log("credits", data.credits);
      console.log("card_number", data.card_number);
      console.log("cvc", data.cvc);
      console.log("exp_date", data.exp_date);
      console.log("name", data.name);

      const [exp_month, exp_year] = data.exp_date.split("/");

      const buyCreditsRequest = buyCreditsFactory(
        {
          card_number: data.card_number,
          name: data.name,
          exp_month,
          exp_year,
          cvc: data.cvc,
        },
        data.credits
      );
      const response = await buyCreditsRequest;
      console.log("buyCreditsResponse", response);

      infoToast("Successfully purchased credits!");
      reset();
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:buy-credits.title")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {t("dashboard-page:buy-credits.description")}
              </p>
            </div>
          </div>
          <div>
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
              >
                <div>
                  {/* Amount of credits */}
                  <div>
                    <Controller
                      name="selectedCreditAmountPreset"
                      control={control}
                      defaultValue={creditAmountPresets[0]}
                      render={(props) => (
                        <RadioGroup
                          {...props.field}
                          onChange={(value) => {
                            if (value.id === 1) {
                              // prettier-ignore
                              setValue("selectedCreditAmountPreset", creditAmountPresets[0]);
                              // prettier-ignore
                              setValue("credits", creditAmountPresets[0].creditsAmount);
                            } else if (value.id === 2) {
                              // prettier-ignore
                              setValue("selectedCreditAmountPreset", creditAmountPresets[1]);
                              // prettier-ignore
                              setValue("credits", creditAmountPresets[1].creditsAmount);
                            } else {
                              setValue(
                                "selectedCreditAmountPreset",
                                creditAmountPresets[2]
                              );
                            }
                          }}
                        >
                          <RadioGroup.Label className="text-lg font-medium text-gray-900">
                            <span
                              className="flex items-center px-6 py-4 text-sm font-medium"
                              aria-current="step"
                            >
                              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                                <span className="text-blue-600">1</span>
                              </span>
                              <span className="ml-4 text-sm font-medium text-blue-600">
                                Choose credits
                              </span>
                            </span>
                          </RadioGroup.Label>

                          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            {creditAmountPresets.map((preset) => {
                              const checked =
                                preset.id === props.field.value.id;

                              return (
                                <RadioGroup.Option
                                  key={preset.id}
                                  value={preset}
                                  className={({ active }) =>
                                    classNames(
                                      checked
                                        ? "border-transparent"
                                        : "border-gray-300",
                                      active ? "ring-2 ring-blue-500" : "",
                                      "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                                    )
                                  }
                                >
                                  {({ active }) => {
                                    return (
                                      <>
                                        <span className="flex flex-1">
                                          <span className="flex flex-col">
                                            <RadioGroup.Label
                                              as="span"
                                              className="block text-sm font-medium text-gray-900"
                                            >
                                              {preset.title}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                              as="span"
                                              className="mt-1 flex items-center text-sm text-gray-500"
                                            >
                                              {preset.description}
                                            </RadioGroup.Description>
                                            <RadioGroup.Description
                                              as="span"
                                              className="mt-6 text-sm font-medium text-gray-900"
                                            >
                                              {preset.price}
                                            </RadioGroup.Description>
                                          </span>
                                        </span>
                                        {checked ? (
                                          <CheckCircleIcon
                                            className="h-5 w-5 text-blue-600"
                                            aria-hidden="true"
                                          />
                                        ) : null}
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked
                                              ? "border-blue-500"
                                              : "border-transparent",
                                            "pointer-events-none absolute -inset-px rounded-lg"
                                          )}
                                          aria-hidden="true"
                                        />
                                      </>
                                    );
                                  }}
                                </RadioGroup.Option>
                              );
                            })}
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {creditAmountPreset.id === 3 && (
                      <div className="mt-6">
                        <div className="col-span-4">
                          <label
                            htmlFor="credits"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Amount of credits: {credits.toLocaleString()}
                          </label>
                          <div className="mt-2">
                            <input
                              {...register("credits", {
                                required:
                                  creditAmountPreset.id === 3 ? true : false,
                                pattern: new RegExp(/^[0-9]+$/),
                              })}
                              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              type="range"
                              name="credits"
                              autoComplete="credits"
                              min={100}
                              max={100000}
                              onChange={(event) => {
                                console.log("---");

                                const val = Number.parseInt(event.target.value);
                                setValue("credits", val);
                              }}
                            />
                          </div>
                          <div className="mt-2">
                            <input
                              {...register("credits", {
                                required:
                                  creditAmountPreset.id === 3 ? true : false,
                                pattern: new RegExp(/^[0-9]+$/),
                              })}
                              className="block rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                              type="input"
                              name="credits"
                              autoComplete="credits"
                              min={100}
                              max={100000}
                              onChange={(event) => {
                                console.log("---");
                                let val;
                                if (event.target.value) {
                                  val = Number.parseInt(event.target.value);
                                  setValue("credits", val);
                                } else {
                                  setValue("credits", 0);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment */}
                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">
                      <span
                        className="flex items-center px-6 py-4 text-sm font-medium"
                        aria-current="step"
                      >
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                          <span className="text-blue-600">2</span>
                        </span>
                        <span className="ml-4 text-sm font-medium text-blue-600">
                          Payment{" "}
                        </span>
                      </span>
                    </h2>

                    <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                      <div className="col-span-4">
                        <label
                          htmlFor="card_number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Card number{" "}
                          <span>
                            <FaCcStripe
                              className="text-indigo-600 inline h-6 w-6"
                              aria-label="Stripe Icon"
                            />
                          </span>
                        </label>
                        <div className="mt-1">
                          <input
                            {...register("card_number", {
                              required: true,
                              pattern: new RegExp(/^[0-9]+$/),
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            type="text"
                            name="card_number"
                            autoComplete="card_number"
                          />
                        </div>
                      </div>

                      <div className="col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name on card
                        </label>
                        <div className="mt-1">
                          <input
                            {...register("name", {
                              required: true,
                            })}
                            type="text"
                            name="name"
                            autoComplete="name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor="exp_date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expiration date (MM/YY)
                        </label>
                        <div className="mt-1">
                          <input
                            {...register("exp_date", {
                              required: true,
                              pattern: new RegExp(/[0-9]{2}\/[0-9]{2}/),
                            })}
                            placeholder="MM/YY"
                            type="text"
                            name="exp_date"
                            id="exp_date"
                            autoComplete="exp_date"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                            placeholder="&bull;&bull;&bull;"
                            type="text"
                            name="cvc"
                            id="cvc"
                            autoComplete="csc"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mt-1">
                          <label
                            htmlFor="saveCard"
                            className="text-sm font-medium text-gray-700"
                          >
                            Save Card?
                          </label>
                          <input
                            {...register("saveCard")}
                            type="checkbox"
                            name="saveCard"
                            id="saveCard"
                            autoComplete="saveCard"
                            className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="mt-10 lg:mt-0">
                  <h2 className="text-lg px-6 pt-8 font-medium text-gray-900">
                    Checkout{" "}
                  </h2>

                  <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                    <h3 className="sr-only">Items in your cart</h3>
                    <ul role="list" className="divide-y divide-gray-200">
                      <li className="flex px-4 py-6 sm:px-6">
                        <div className="flex-shrink-0">
                          <CircleStackIcon
                            className="text-blue-600 h-6 w-6"
                            aria-label="Usage Credits Icon"
                          />
                        </div>
                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">Credits</h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {credits.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              ${(credits / 100).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          ${(credits / 100).toFixed(2)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Fees</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          ${calculateFees(credits)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900">
                          ${calculateTotal(credits)}
                        </dd>
                      </div>
                    </dl>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <button
                        type="submit"
                        disabled={!isValid}
                        className={`${
                          !isValid ? "opacity-50" : "opacity-100"
                        } w-full rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50`}
                      >
                        Get credits
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

BuyCredits.requireAuth = true;
