import React, { RefObject, useState } from "react";
import { useTranslation } from "next-i18next";
import { errorToast, infoToast } from "@/utility/toasts";
import { getSummarizationQuote } from "@/services/getSummarizationQuote";
import { navigatorLangDetector } from "@/lib/languageDetector";
import { useRouter } from "next/router";
import { customSummaryFactory } from "@/serviceFactory/customSummaryFactory";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { RightArea } from "../sharedComponents/rightArea";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { CircleStackIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import {
  calculateFees,
  calculateTotal,
} from "@/utility/pricing/calculatePricing";
import { buyCreditsFactory } from "@/serviceFactory/buyCreditsFactory";
import { errorReporter } from "@/utility/error/reporter";

interface Props {
  paymentMethod: {
    card_number: string;
    name: string;
    exp_date: string;
    cvc: string;
    saveCard: boolean;
  } | null;
  creditsAmount: {
    credits: number;
    selectedCreditAmountPreset: {
      id: number;
      title: string;
      price: string;
    };
  } | null;
  wizardStepsRef: RefObject<HTMLElement>;
}

export function Review(props: Props) {
  const { paymentMethod, creditsAmount, wizardStepsRef } = props;

  const router = useRouter();
  const { t } = useTranslation();

  const [request, setRequest] = useState<{
    loading: boolean;
    val: any;
    err: any;
  }>({
    loading: false,
    val: null,
    err: null,
  });

  return (
    <Layout3ColumnAndFooterWrapper>
      <_3ColumnWrapper>
        <div className="mx-auto w-full max-w-lg">
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg px-6 pt-8 font-medium text-gray-900 text-center">
              Checkout{" "}
            </h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Your cart</h3>
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
                          {creditsAmount?.credits.toLocaleString(
                            navigator.language,
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 items-end justify-between pt-2">
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ${((creditsAmount?.credits || 0) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${((creditsAmount?.credits || 0) / 100).toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Fees</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${calculateFees(creditsAmount?.credits || 0)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${calculateTotal(creditsAmount?.credits || 0)}
                  </dd>
                </div>
              </dl>

              {/* <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <button
                type="submit"
                disabled={!isValid}
                className={`${
                  !isValid ? "opacity-50" : "opacity-100"
                } w-full rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50`}
              >
                Get credits
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </_3ColumnWrapper>

      <FooterWrapper>
        <button
          onClick={async () => {
            try {
              if (paymentMethod && creditsAmount) {
                setRequest({
                  val: null,
                  loading: true,
                  err: null,
                });

                console.log("paymentMethod", paymentMethod);
                console.log("credits", creditsAmount.credits);
                console.log("card_number", paymentMethod?.card_number);
                console.log("cvc", paymentMethod?.cvc);
                console.log("exp_date", paymentMethod?.exp_date);
                console.log("name", paymentMethod?.name);

                const [exp_month, exp_year] = paymentMethod.exp_date.split("/");

                const buyCreditsRequest = buyCreditsFactory(
                  {
                    card_number: paymentMethod?.card_number,
                    name: paymentMethod?.name,
                    exp_month,
                    exp_year,
                    cvc: paymentMethod?.cvc,
                  },
                  typeof creditsAmount.credits === "number"
                    ? creditsAmount.credits
                    : Number.parseFloat(creditsAmount.credits)
                );
                const response = await buyCreditsRequest;
                console.log("buyCreditsResponse", response);

                const detectedLng = navigatorLangDetector();
                router.push(`/${detectedLng}/dashboard`);
                infoToast("Successfully purchased credits...", "bottom-right");
              }
            } catch (e) {
              errorReporter(e);

              setRequest({
                val: null,
                loading: false,
                err: e,
              });
            }
          }}
          disabled={!creditsAmount || !paymentMethod || request.loading}
          className={`${
            !creditsAmount || !paymentMethod || request.loading
              ? "opacity-50"
              : "opacity-100"
          } flex items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          <LockClosedIcon className="h-6 w-6 inline relative -top-0.5" />
          {/* <LockClosedIcon className="h-6 w-6" /> */}
          &nbsp;
          {request.loading
            ? t("dashboard-page:summarize-v2.loading")
            : t("dashboard-page:buy-credits.complete-purchase")!}
        </button>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
