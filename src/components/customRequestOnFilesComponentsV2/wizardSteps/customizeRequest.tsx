import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, Fragment, RefObject, SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { Menu, Transition } from "@headlessui/react";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { RightArea } from "../sharedComponents/rightArea";
import { classNames } from "@/utility/misc/classNames";

interface Props {
  files: File[];
  prompt: string;
  setStep: Dispatch<SetStateAction<number>>;
  setPrompt: Dispatch<SetStateAction<string>>;
  wizardStepsRef: RefObject<HTMLElement>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
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
  const { prompt, files, setStep, setPrompt } = props;
  const { t } = useTranslation();

  const onSubmit = async (data: any) => {
    try {
      setPrompt(data.prompt);
      setStep(3);
    } catch (e: any) {}
  };

  const {
    register,
    getValues,
    formState: { isValid },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      prompt: prompt || "",
    },
  });

  return (
    <Layout3ColumnAndFooterWrapper>
      <_3ColumnWrapper>
        <LeftAreaAndMainWrapper>
          <LeftArea>
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
              {t("dashboard-page:custom-request-v2.chosen-files")!}
            </h2>
            {files.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-100">
                {Object.keys(files).map((value: string, index: number) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-x-6 py-5"
                    >
                      <div className="flex items-start gap-x-3">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {files[index].name}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-1 text-sm leading-6 text-gray-400">
                No files selected
              </p>
            )}
          </LeftArea>

          <MainArea>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="col-span-full">
                <form>
                  <div>
                    <label
                      htmlFor="prompt"
                      // className="block text-sm font-medium leading-6 text-gray-900"
                      className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl"
                    >
                      {t("dashboard-page:custom-request.prompt")}
                    </label>
                    <div className="mt-2">
                      <textarea
                        {...register("prompt", {
                          required: true,
                        })}
                        placeholder={
                          t(
                            "dashboard-page:custom-request-v2.prompt-placeholder-text"
                          )!
                        }
                        rows={4}
                        name="prompt"
                        id="prompt"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </MainArea>
        </LeftAreaAndMainWrapper>

        <RightArea>
          <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight underline-offset-4 text-center">
            {t("dashboard-page:custom-request-v2.suggested-requests")!}
          </h2>
          {preBuiltPrompts.map((prompt) => (
            <li
              key={prompt.id}
              className="flex items-center justify-between gap-x-6 py-4 pt-8"
            >
              <div className="min-w-0">
                <div
                  onClick={() => {
                    setValue("prompt", prompt.prompt);
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
          ))}
        </RightArea>
      </_3ColumnWrapper>
      <FooterWrapper>
        <button
          disabled={!isValid}
          onClick={() => {
            onSubmit(getValues());
          }}
          className={`${
            files.length === 0 || !isValid ? "opacity-50" : "opacity-100"
          } inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          Next
        </button>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
