import React, { Dispatch, Fragment, RefObject, SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { RightArea } from "../sharedComponents/rightArea";
import { classNames } from "@/utility/misc/classNames";
import { SummaryMode } from "@/types/SummaryMode";
import { Prompt } from "./ragRequestComponents/Prompt";
import { enoughUsageCreditsToUsePaidFeatures } from "@/utility/guards/enoughUsageCreditsToUsePaidFeatures";
import get from "lodash.get";

interface Props {
  account: any;
  file: File | null;
  customizations: {
    model: "gpt-3.5-turbo" | "gpt-4";
    prompt?: string;
  } | null;
  setStep: Dispatch<SetStateAction<number>>;
  setCustomizations: Dispatch<
    SetStateAction<{
      model: "gpt-3.5-turbo" | "gpt-4";
      prompt?: string;
    } | null>
  >;
  wizardStepsRef: RefObject<HTMLElement>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function CustomizeRequest(props: Props) {
  const {
    customizations,
    file,
    setStep,
    setCustomizations,
    setShowPaymentMethodRequiredModal,
    account,
  } = props;

  const { t } = useTranslation();

  const onSubmit = async (data: any) => {
    try {
      console.log("provideRequest submit", data);
      setCustomizations(data);
      setStep(3);
    } catch (e: any) {}
  };

  // console.log("files", files);

  let disablePerPageMode = false;

  if (file?.type !== "application/pdf") {
    disablePerPageMode = true;
  }

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    resetField,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      model: customizations?.model || "gpt-3.5-turbo",
      prompt: customizations?.prompt || "",
    },
  });

  watch("prompt");

  return (
    <Layout3ColumnAndFooterWrapper>
      <_3ColumnWrapper>
        <LeftAreaAndMainWrapper>
          <LeftArea>
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
              {t("dashboard-page:rag.chosen-file")!}
            </h2>
            {file ? (
              <ul role="list" className="divide-y divide-gray-100">
                <li className="flex items-center justify-between gap-x-6 py-5">
                  <div className="flex items-start gap-x-3 truncate">
                    <p className="text-sm font-semibold leading-6 text-gray-900 truncate">
                      {file.name}
                    </p>
                  </div>
                </li>
              </ul>
            ) : (
              <p className="mt-1 text-sm leading-6 text-gray-400">
                No file selected
              </p>
            )}
          </LeftArea>

          <MainArea>
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl text-center">
              {t("dashboard-page:rag.query")}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="col-span-full">
                <form className="mx-auto">
                  <div className="space-y-12 sm:space-y-16">
                    <div className="sm:mt-2 space-y-10 border-gray-900/10 pb-12 sm:space-y-6 sm:divide-y sm:divide-gray-900/10 sm:pb-0">
                      <fieldset className="space-y-2">
                        <Prompt
                          values={getValues()}
                          register={register}
                          trigger={trigger}
                          setValue={setValue}
                        />
                      </fieldset>
                      <fieldset>
                        <legend className="sr-only">A.I. model</legend>
                        <div className="py-6">
                          <label
                            htmlFor="model"
                            className="block text-md font-medium leading-6 text-gray-900 sm:pt-1.5"
                          >
                            A.I. model
                          </label>
                          <div className="mt-1 sm:mt-0">
                            <div className="mt-2 space-x-2 flex justify-between w-full">
                              <select
                                {...register("model")}
                                id="model"
                                name="model"
                                autoComplete="model"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-full sm:text-sm sm:leading-6"
                              >
                                <option value={"gpt-3.5-turbo"}>
                                  GPT-3 (4k)
                                </option>
                                <option
                                  disabled={
                                    !enoughUsageCreditsToUsePaidFeatures(
                                      get(account, "usageCredits", 0),
                                      "gpt-3.5-turbo-16k"
                                    )
                                  }
                                  value={"gpt-3.5-turbo-16k"}
                                >
                                  GPT-3 (16k)
                                </option>
                                <option
                                  disabled={
                                    !enoughUsageCreditsToUsePaidFeatures(
                                      get(account, "usageCredits", 0),
                                      "gpt-4"
                                    )
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
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </MainArea>
        </LeftAreaAndMainWrapper>

        <RightArea>
          <></>
        </RightArea>
      </_3ColumnWrapper>
      <FooterWrapper>
        <>
          <button
            onClick={() => {
              setStep(1);
            }}
            className={`opacity-100 inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
          >
            Back
          </button>
          <button
            disabled={!(file && isValid)}
            onClick={() => {
              onSubmit(getValues());
            }}
            className={`${
              file && isValid ? "opacity-100" : "opacity-50"
            } inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
          >
            Next
          </button>
        </>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
