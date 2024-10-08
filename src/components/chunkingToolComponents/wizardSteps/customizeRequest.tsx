import {
  EllipsisVerticalIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
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
import { SupportedOpenAiModels } from "@/types/SupportedOpenAiModels";

interface Props {
  account: any;
  files: File[];
  customizations: {
    mode: string;
    model: SupportedOpenAiModels;
    prompt?: string;
    finalPrompt?: string;
    overallPrompt?: string;
    includeFinalPrompt?: boolean;
  } | null;
  setStep: Dispatch<SetStateAction<number>>;
  setCustomizations: Dispatch<
    SetStateAction<{
      mode: string;
      model: SupportedOpenAiModels;
      prompt?: string;
      finalPrompt?: string;
      overallPrompt?: string;
      includeFinalPrompt?: boolean;
    } | null>
  >;
  wizardStepsRef: RefObject<HTMLElement>;
}

const preBuiltPrompts = [
  {
    id: 1,
    name: "Summarization",
    prompt: "Summarize the following data.",
  },
  {
    id: 2,
    name: "Data Extraction",
    prompt:
      "Extract all numbers and metrics from the following data. Please return the results in JSON format where each result in the list of results contains a 'value' key (containing the found number or value) and a 'reference' key (containing where in the source data the number or metric came from).",
  },
  {
    id: 3,
    name: "Bullet Points",
    prompt:
      "Summarize the following data and return the summary as a list of bullet points. Please return the bullet points as a valid JSON formatted array.",
  },
];

export function CustomizeRequest(props: Props) {
  const { customizations, files, setStep, setCustomizations, account } = props;
  const { t } = useTranslation();

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
    trigger,
    resetField,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      mode: customizations?.mode || "EACH_FILE_OVERALL",
      model: customizations?.model || "gpt-3.5-turbo",
      prompt: customizations?.prompt,
      includeFinalPrompt: customizations?.includeFinalPrompt,
      finalPrompt: customizations?.finalPrompt,
      overallPrompt: customizations?.overallPrompt,
    },
  });

  const mode = watch("mode");
  watch("prompt");
  watch("includeFinalPrompt");
  watch("finalPrompt");
  watch("overallPrompt");

  return (
    <Layout3ColumnAndFooterWrapper>
      <_3ColumnWrapper>
        <LeftAreaAndMainWrapper>
          <LeftArea>
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
              {t("dashboard-page:chunking-tool.chosen-file")!}
            </h2>
            {files.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-100">
                {Object.keys(files).map((value: string, index: number) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-x-6 py-5"
                    >
                      <div className="flex items-start gap-x-3 truncate">
                        <p className="text-sm font-semibold leading-6 text-gray-900 truncate">
                          {files[index].name}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-1 text-sm leading-6 text-gray-400">
                No file selected
              </p>
            )}
          </LeftArea>

          <MainArea>
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl text-center">
              {t("dashboard-page:custom-request-v2.customizations")}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="col-span-full">
                <form className="mx-auto">
                  <div className="space-y-12 sm:space-y-16">
                    <div className="sm:mt-2 space-y-10 border-gray-900/10 pb-12 sm:space-y-6 sm:divide-y sm:divide-gray-900/10 sm:pb-0">
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
                                  disabled={!account?.stripeDefaultSource}
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
          {/* <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight underline-offset-4 text-center">
            {t("dashboard-page:custom-request-v2.suggested-requests")!}
          </h2>
          {preBuiltPrompts.map((prompt) => (
            <li
              key={prompt.id}
              className="flex items-center justify-between gap-x-6 pt-8"
            >
              <div className="min-w-0">
                <div
                  onClick={() => {
                    setValue("prompt", prompt.prompt);
                    trigger();
                  }}
                  className="flex items-start gap-x-3 cursor-pointer"
                >
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {prompt.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <Menu as="div" className="relative flex-none cursor-pointer">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">
                      {t("dashboard-page:custom-request-v2.open-options")}
                    </span>
                    <EllipsisVerticalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-300"
                            )}
                          >
                            {t(
                              "dashboard-page:custom-request-v2.more-like-this"
                            )}
                            <span className="sr-only">, {prompt.name}</span>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              setValue("prompt", prompt.prompt);
                              trigger("prompt");
                            }}
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            {t("dashboard-page:custom-request-v2.select")}
                            <span className="sr-only">, {prompt.name}</span>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-300"
                            )}
                          >
                            {t("dashboard-page:custom-request-v2.not-this-one")}
                            <span className="sr-only">, {prompt.name}</span>
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))} */}
        </RightArea>
      </_3ColumnWrapper>
      <FooterWrapper>
        <button
          disabled={!(files.length > 0 && isValid)}
          onClick={() => {
            onSubmit(getValues());
          }}
          className={`${
            files.length > 0 && isValid ? "opacity-100" : "opacity-50"
          } inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          Next
        </button>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
