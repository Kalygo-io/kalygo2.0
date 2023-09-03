import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { SummaryMode } from "@/types/SummaryMode";
import {
  InformationCircleIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

interface Props {
  account: any;
  files: File[];
  customizations: Record<string, string> | null;
  setStep: Dispatch<SetStateAction<number>>;
  setCustomizations: Dispatch<SetStateAction<Record<string, string> | null>>;
  wizardStepsRef: RefObject<HTMLElement>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function CustomizeSummary(props: Props) {
  const {
    customizations,
    setStep,
    setCustomizations,
    setShowPaymentMethodRequiredModal,
    account,
  } = props;
  const { t } = useTranslation();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      console.log("provideRequest submit", data);
      setCustomizations(data);
      setStep(3);
    } catch (e: any) {}
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      format: customizations?.format || "bullet-points",
      mode: customizations?.mode || "EACH_FILE_OVERALL",
      length: customizations?.length || "short",
      language: customizations?.language || "English",
      model: customizations?.model || "gpt-3.5-turbo",
    },
  });

  return (
    <div className="flex min-h-full flex-col">
      <_3ColumnWrapper>
        <form className="mx-auto">
          <div className="space-y-12 sm:space-y-16">
            <div className="mt-6 sm:mt-0 space-y-10 border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:pb-0">
              <fieldset>
                <legend className="sr-only">Format</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <div
                    className="text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    Format
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      <div className="mt-6 space-x-2 flex justify-between">
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("format")}
                            id="bullet-points"
                            type="radio"
                            value="bullet-points"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="bullet-points"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Bullet points
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("format")}
                            id="paragraph"
                            type="radio"
                            value="paragraph"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="paragraph"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Paragraph
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">Mode</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <div
                    className="flex text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    Scanning Mode
                    <sup
                      className="flex"
                      onClick={() => {
                        console.log("--- ___ ---");

                        router.push("/");
                      }}
                    >
                      <InformationCircleIcon className="h-4 w-4 text-blue-500 hover:text-blue-600 cursor-pointer" />
                    </sup>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      <div className="mt-6 space-x-2 flex flex-wrap justify-between mx-auto">
                        <select
                          {...register("mode")}
                          id="mode"
                          name="mode"
                          autoComplete="mode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value={SummaryMode.EACH_FILE_OVERALL}>
                            Each Overall
                          </option>
                          <option value={SummaryMode.EACH_FILE_IN_CHUNKS}>
                            Each In Chunks
                          </option>
                          <option value={SummaryMode.OVERALL}>Overall</option>
                          <option disabled value={SummaryMode.PER_PAGE}>
                            Per Page
                          </option>
                        </select>

                        {/* <div className="flex items-center gap-x-2">
                          <input
                            {...register("mode")}
                            id="overall-data"
                            type="radio"
                            value={SummaryMode.EACH_FILE_OVERALL}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="overall-data"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Each Overall
                          </label>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <input
                            {...register("mode")}
                            id="each-part-of-data"
                            type="radio"
                            value={SummaryMode.EACH_FILE_IN_CHUNKS}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="each-part-of-data"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Each In Chunks
                          </label>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <input
                            {...register("mode")}
                            id="overall"
                            type="radio"
                            value={SummaryMode.OVERALL}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="overall"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Overall
                          </label>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <input
                            {...register("mode")}
                            id="per_page"
                            type="radio"
                            value={SummaryMode.PER_PAGE}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="per_page"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Per Page
                          </label>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">Length</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <div
                    className="text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    Length
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      <div className="mt-6 space-x-2 flex justify-between">
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("length")}
                            id="short"
                            name="length"
                            type="radio"
                            value="short"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="short"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Short
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("length")}
                            id="medium"
                            name="length"
                            type="radio"
                            value="medium"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="medium"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Medium
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("length")}
                            id="long"
                            name="length"
                            type="radio"
                            value="long"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="long"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Long
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">Language</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Language
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      <div className="mt-6 space-x-2 flex justify-between">
                        <select
                          {...register("language")}
                          id="language"
                          name="language"
                          autoComplete="language"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>Portuguese</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="sm:grid sm:grid-cols-1 sm:items-baseline sm:gap-4 sm:py-6">
                {/* <label
                  htmlFor="language"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Language
                </label> */}
                <div className="mt-1 sm:col-span-3 sm:mt-0">
                  <div className="max-w-lg">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <span className="flex">
                            <Disclosure.Button>
                              {!open ? (
                                <>
                                  <label className="block text-sm font-medium leading-6 text-gray-900 px-1">
                                    <PlusIcon
                                      className="h-5 w-5 inline relative -top-0.5 text-blue-600 hover:text-blue-500"
                                      aria-hidden="true"
                                    />{" "}
                                    Show advanced options
                                  </label>
                                </>
                              ) : (
                                <>
                                  <label className="block text-sm font-medium leading-6 text-gray-900 px-1">
                                    <MinusIcon
                                      className="h-5 w-5 inline relative -top-0.5 text-blue-600 hover:text-blue-500"
                                      aria-hidden="true"
                                    />{" "}
                                    Hide advanced options
                                  </label>
                                </>
                              )}
                            </Disclosure.Button>
                          </span>

                          <Transition
                            enter="transition duration-200 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-150 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-190 opacity-0"
                          >
                            <Disclosure.Panel className="bg-slate-100 rounded-md p-4 my-2">
                              <fieldset>
                                <legend className="sr-only">A.I. model</legend>
                                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-2">
                                  <label
                                    htmlFor="ai-model"
                                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                                  >
                                    A.I. model
                                  </label>
                                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                                    <div className="max-w-lg">
                                      <div className="mt-2 space-x-2 flex justify-between">
                                        <select
                                          {...register("model")}
                                          id="model"
                                          name="model"
                                          autoComplete="model"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                          <option value={"gpt-3.5-turbo"}>
                                            GPT-3 (4k)
                                          </option>
                                          <option
                                            disabled={
                                              !account.stripeDefaultSource
                                            }
                                            value={"gpt-4"}
                                          >
                                            GPT-4 (8k)
                                          </option>
                                          <option disabled value={"llama-2"}>
                                            LLaMa 2
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </_3ColumnWrapper>
      <FooterWrapper>
        <div className="flex items-center justify-end gap-x-6">
          <button
            onClick={() => {
              onSubmit(getValues());
            }}
            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Next
          </button>
        </div>
      </FooterWrapper>
    </div>
  );
}
