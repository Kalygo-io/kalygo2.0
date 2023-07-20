import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import React, { Fragment, Ref, RefObject, useState } from "react";
import get from "lodash.get";

import { useTranslation } from "next-i18next";

import { errorToast, infoToast } from "@/utility/toasts";
import { getSummarizationQuote } from "@/services/getSummarizationQuote";
import { useForm, Controller } from "react-hook-form";
import { similaritySearchInFile } from "@/services/similaritySearchInFile";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { PreviewTextFile } from "@/components/shared/PreviewTextFile";
import { fileURLToPath } from "url";
import { similaritySearchWithQueue } from "@/services/similaritySearchWithQueue";
import { navigatorLangDetector } from "@/lib/languageDetector";
import { useRouter } from "next/router";
import isNumber from "lodash.isnumber";
import { getAccountPaymentMethodsFactory } from "@/serviceFactory/getAccountPaymentMethodsFactory";
import { Menu, Transition } from "@headlessui/react";
import { customRequestFactory } from "@/serviceFactory/customRequestFactory";

interface Props {
  prompt: string;
  files: File[];
  wizardStepsRef: RefObject<HTMLElement>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Review(props: Props) {
  const { prompt, files, wizardStepsRef, setShowPaymentMethodRequiredModal } =
    props;

  const [numPages, setNumPages] = useState<number>();
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({});

  const [searchState, setSearchState] = useState<{
    val: any;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: false,
    err: null,
  });

  return (
    <div className="flex min-h-full flex-col">
      {/* 3 column wrapper */}
      <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-96 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
            {/* Left column area */}
            {/* LEFT */}
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight underline underline-offset-4">
              {t("dashboard-page:custom-request-v2.chosen-files")!}
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
            {/* MAIN */}
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight underline underline-offset-4">
              {t("dashboard-page:custom-request-v2.provided-request")!}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              {/* <div className="col-span-full flex justify-center"> */}
              <div className="col-span-full">
                <form>
                  <div>
                    <div className="mt-2">
                      <textarea
                        readOnly
                        defaultValue={prompt}
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
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
          {/* Right column area */}
          {/* RIGHT */}
          <div>
            <button
              onClick={async () => {
                try {
                  const customRequest = customRequestFactory(prompt, files);
                  const customRequestResponse = await customRequest;
                  console.log("customRequestResponse", customRequestResponse);

                  const detectedLng = navigatorLangDetector();
                  router.push(`/${detectedLng}/dashboard/queue`);
                  infoToast(t("toast-messages:custom-request-is-processing"));
                } catch (e: any) {
                  errorToast(e.toString());
                }
              }}
              disabled={files.length === 0 || prompt === ""}
              className={`${
                files.length === 0 || prompt === ""
                  ? "opacity-50"
                  : "opacity-100"
              } mt-2 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
            >
              {t("dashboard-page:custom-request.run")!}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
