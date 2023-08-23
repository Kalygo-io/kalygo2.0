import {
  CheckCircleIcon,
  CircleStackIcon,
  DocumentDuplicateIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "next-i18next";
import { getAccountPaymentMethodsFactory } from "@/serviceFactory/getAccountPaymentMethodsFactory";
import isNumber from "lodash.isnumber";
import get from "lodash.get";
import { errorReporter } from "@/utility/error/reporter";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { RightArea } from "../sharedComponents/rightArea";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { enoughUsageCreditsToUsePaidFeatures } from "@/utility/guards/enoughUsageCreditsToUsePaidFeatures";
import { Controller, useForm } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { infoToast } from "@/utility/toasts";
import { classNames } from "@/utility/misc/classNames";
import {
  calculateFees,
  calculateTotal,
} from "@/utility/pricing/calculatePricing";
import isString from "lodash/isString";

interface Props {
  creditsAmount: {
    credits: number;
    selectedCreditAmountPreset: {
      id: number;
      title: string;
      price: string;
    };
  } | null;
  setCreditsAmount: Dispatch<
    SetStateAction<{
      credits: number;
      selectedCreditAmountPreset: {
        id: number;
        title: string;
        price: string;
      };
    } | null>
  >;
  setStep: Dispatch<SetStateAction<number>>;
}

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

export function SelectCredits(props: Props) {
  const { creditsAmount, setCreditsAmount, setStep } = props;
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [filesLocal, setFilesLocal] = useState<File[] | null>();
  const inputRef = useRef<HTMLInputElement>(null);

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
      credits: 1000,
      selectedCreditAmountPreset: creditsAmount?.selectedCreditAmountPreset || {
        id: 2,
        title: "Custom",
        price: "Flexible amount",
      },
      saveCard: false,
    },
  });

  useEffect(() => {
    if (creditsAmount) {
      setValue("credits", creditsAmount?.credits);
      setValue(
        "selectedCreditAmountPreset",
        creditsAmount?.selectedCreditAmountPreset
      );
    }
  }, []);

  const credits = watch("credits");
  const selectedCreditAmountPreset = watch("selectedCreditAmountPreset");

  return (
    <Layout3ColumnAndFooterWrapper>
      <_3ColumnWrapper>
        <form className="mx-auto lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Amount of credits */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg px-6 pt-6 font-medium text-gray-900">
              Select{" "}
            </h2>
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
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {creditAmountPresets.map((preset) => {
                      const checked = preset.id === props.field.value.id;

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
            {selectedCreditAmountPreset.id === 3 && (
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
                          selectedCreditAmountPreset.id === 3 ? true : false,
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
                          selectedCreditAmountPreset.id === 3 ? true : false,
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
          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg px-6 pt-6 font-medium text-gray-900">
              Summary{" "}
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
            </div>
          </div>
        </form>
      </_3ColumnWrapper>
      <FooterWrapper>
        <button
          disabled={!isValid}
          onClick={() => {
            setCreditsAmount({
              credits: credits,
              selectedCreditAmountPreset: selectedCreditAmountPreset,
            });
            setStep(2);
          }}
          className={`
            ${!isValid ? "opacity-50" : "opacity-100"}
            inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          Next
        </button>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
