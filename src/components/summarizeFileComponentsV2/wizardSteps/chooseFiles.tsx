import {
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

interface Props {
  files: File[] | null;
  setFiles: Dispatch<SetStateAction<File[] | null>>;
  setStep: Dispatch<SetStateAction<number>>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function ChooseFiles(props: Props) {
  const { files, setFiles, setStep, setShowPaymentMethodRequiredModal } = props;

  const { t } = useTranslation();

  const [dragActive, setDragActive] = useState(false);
  const [filesLocal, setFilesLocal] = useState<File[] | null>();

  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilesLocal(files);
  }, []);

  // handle drag events
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      const dataTransferItems = e.dataTransfer?.items;

      for (let i = 0; i < dataTransferItems.length; i++) {
        if (
          !["application/pdf", "text/plain"].includes(
            dataTransferItems[i]?.type
          )
        ) {
          setDragActive(false);
          return;
        }
      }
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = async function (e: any) {
    try {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (
        e.dataTransfer.files &&
        e.dataTransfer.files[0] &&
        ["application/pdf", "text/plain"].includes(
          e.dataTransfer?.items["0"]?.type
        )
      ) {
        // at least one file has been dropped so do something
        setFilesLocal(e.dataTransfer.files || null);
      }
    } catch (e) {
      errorReporter(e);
    }
  };

  // triggers when file is selected with click
  const handleChange = async function (e: any) {
    try {
      e.preventDefault();
      if (e.target.files && e.target.files) {
        // at least one file has been selected so do something

        const paymentMethodsRequest = getAccountPaymentMethodsFactory();
        const paymentMethodsResponse = await paymentMethodsRequest;
        console.log("paymentMethodsResponse", paymentMethodsResponse);

        if (
          (isNumber(get(paymentMethodsResponse, "data.customRequestCredits")) &&
            get(paymentMethodsResponse, "data.customRequestCredits") > 0) ||
          get(paymentMethodsResponse, "data.stripeDefaultSource")
        ) {
          setFilesLocal(e.target.files);
        } else {
          // show Payment Required Modal
          console.log("PAYMENT REQUIRED");
          setShowPaymentMethodRequiredModal(true);
        }
      }
    } catch (e) {
      errorReporter(e);
    }
  };

  console.log("filesLocal", filesLocal);

  return (
    <div className="flex min-h-full flex-col">
      {/* 3 column wrapper */}
      <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:pb-0">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          {/* <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6"> */}
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6">
            {/* Left column area */}
          </div>

          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full flex justify-center">
                <form
                  id="form-file-upload"
                  onDragEnter={handleDrag}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div
                    id="label-file-upload"
                    className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
                      dragActive ? "drag-active" : ""
                    }`}
                  >
                    <div>
                      <DocumentDuplicateIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />

                      <div className="mb-2 mt-2 flex items-center justify-center text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="input-file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                        >
                          <button
                            type="button"
                            className="rounded bg-blue-600 px-2 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            onClick={() => {
                              inputRef.current?.click();
                            }}
                          >
                            {t("dashboard-page:summarize-v2.select-files")}
                            <input
                              ref={inputRef}
                              type="file"
                              id="input-file-upload"
                              multiple={true}
                              onChange={handleChange}
                              accept=".pdf,.txt"
                              className="sr-only"
                            />
                          </button>
                        </label>
                      </div>
                      {dragActive && (
                        <div
                          id="drag-file-element"
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                        ></div>
                      )}
                      <p className="text-xs leading-5 text-gray-600">
                        {t("dashboard-page:summarize-v2.upload-limits")}
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6"> */}
        <div className="shrink-0 px-4 py-6 sm:px-6 lg:w-96 lg:pr-8 xl:pr-6">
          {/* Right column area */}
          {/* <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight underline underline-offset-4">
              {t("dashboard-page:custom-request-v2.chosen-files")!}
            </h2> */}
          <ul role="list" className="divide-y divide-gray-100">
            {filesLocal &&
              Object.keys(filesLocal).map((f: string, index: number) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-x-6 py-5"
                  >
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {filesLocal[index].name}
                      </p>

                      <XCircleIcon
                        className="h-6 w-6"
                        onClick={() => {
                          console.log("___ --- ___");
                          let newFileList = Array.from(filesLocal);

                          newFileList.splice(index, 1); // here u remove the file
                          console.log(newFileList);

                          setFilesLocal(newFileList);
                        }}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl mt-6 flex items-center justify-end gap-x-2">
        <button
          disabled={!filesLocal}
          onClick={() => {
            setFiles(filesLocal!);
            setStep(2);
          }}
          className={`
          ${
            !filesLocal || filesLocal.length === 0
              ? "opacity-50"
              : "opacity-100"
          }
          inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
