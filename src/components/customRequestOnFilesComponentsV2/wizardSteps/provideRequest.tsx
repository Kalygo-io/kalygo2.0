import {
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import React, {
  Dispatch,
  Fragment,
  RefObject,
  SetStateAction,
  useState,
} from "react";
import { useTranslation } from "next-i18next";

import { getAccountPaymentMethodsFactory } from "@/serviceFactory/getAccountPaymentMethodsFactory";
import isNumber from "lodash.isnumber";
import get from "lodash.get";
import { useForm } from "react-hook-form";
import { Menu, Transition } from "@headlessui/react";

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
      "Extract all numbers and metrics from from the following data. Please return the results in JSON format where each result contains the value key (containing the found number or value) and a reference key (containing where in the source data the number or metric came from).",
  },
  {
    id: 3,
    name: "Bullet Points",
    prompt:
      "Summarize the following data and return the summary as a list of bullet points. Please return the bullet point as a valid JSON formatted array.",
  },
  {
    id: 4,
    name: "SAVED Custom Prompt #1",
    prompt: "Looking for summary that is maximum 100 words.",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function ProvideRequest(props: Props) {
  const {
    prompt,
    files,
    setStep,
    setPrompt,
    setShowPaymentMethodRequiredModal,
  } = props;
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>();
  const [quoteForFile, setQuoteForFile] = useState<{
    quote: number;
    filePath: string;
  } | null>();

  // ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = async (data: any) => {
    try {
      console.log("provideRequest submit", data);
      setPrompt(data.prompt);
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
      prompt: prompt || "",
    },
  });

  console.log("files", files);

  return (
    <div className="flex min-h-full flex-col">
      {/* 3 column wrapper */}
      <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          {/* <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6"> */}
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6">
            {/* Left column area */}
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight underline underline-offset-4">
              Chosen Files
            </h2>
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
                    {/* <div className="flex flex-none items-center gap-x-4">
                      <Menu as="div" className="relative flex-none">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                          <span className="sr-only">Open options</span>
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
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-50" : "",
                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                  )}
                                >
                                  View
                                  <span className="sr-only">
                                    , {prompt.name}
                                  </span>
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div> */}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              {/* <div className="col-span-full flex justify-center"> */}
              <div className="col-span-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="prompt"
                      className="block text-sm font-medium leading-6 text-gray-900"
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

                  <div>
                    <button className="mt-2 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                      {t("dashboard-page:custom-request-v2.save")!}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6"> */}
        <div className="shrink-0 px-4 py-6 sm:px-6 lg:w-96 lg:pr-8 xl:pr-6">
          {/* Right column area */}
          {/* RIGHT */}
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight underline underline-offset-4">
            Suggested Requests
          </h2>
          {preBuiltPrompts.map((prompt) => (
            <li
              key={prompt.id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {prompt.name}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
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
                            More like this
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
                            Select
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
                            Not this one
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
        </div>
      </div>
    </div>
  );
}
