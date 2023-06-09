import { summarizeFiles } from "@/services/summarizeFiles";
import {
  XCircleIcon,
  ArrowUpOnSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { infoToast } from "@/utility/toasts";
import { getSummarizationQuote } from "@/services/getSummarizationQuote";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { convertFileToTxtFile } from "./convertFileToTxtFile";
import { navigatorLangDetector } from "@/lib/languageDetector";
import { getAccountPaymentMethodsFactory } from "@/serviceFactory/getAccountPaymentMethodsFactory";
import get from "lodash.get";
import cloneDeep from "lodash.clonedeep";
import isNumber from "lodash.isnumber";

interface Props {
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
  onError: (err: any) => void;
}

export function SummarizeFileForm(props: Props) {
  const { onError, setShowPaymentMethodRequiredModal } = props;

  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<FileList | File[] | null>();
  const [quoteForFiles, setQuoteForFiles] = useState<{
    quote: number;
    files: { key: string; originalName: string }[];
  } | null>();

  const router = useRouter();

  const { t } = useTranslation();

  // ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  // handle drag events
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();

    if (
      (e.type === "dragenter" || e.type === "dragover") &&
      ["application/pdf", "text/plain"].includes(
        e.dataTransfer?.items["0"]?.type
      )
    ) {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = async function (e: any) {
    e.preventDefault();
    // e.stopPropagation();
    setDragActive(false);
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      ["application/pdf", "text/plain"].includes(
        e.dataTransfer?.items["0"]?.type
      )
    ) {
      // at least one file has been dropped so do something
      const fileAsTxt: File = await convertFileToTxtFile(
        e.dataTransfer.files[0]
      );

      const paymentMethodsRequest = getAccountPaymentMethodsFactory();
      const paymentMethodsResponse = await paymentMethodsRequest;
      console.log("paymentMethodsResponse", paymentMethodsResponse);

      if (
        (isNumber(get(paymentMethodsResponse, "data.summaryCredits")) &&
          get(paymentMethodsResponse, "data.summaryCredits") > 0) ||
        get(paymentMethodsResponse, "data.stripeDefaultSource")
      ) {
        // account has a payment method (either credits or stripe default source)
        // setFileList(e.dataTransfer.files);
        setFileList([fileAsTxt]);

        getSummarizationQuote(
          [fileAsTxt],
          (
            quote: number,
            files: {
              key: string;
              originalName: string;
            }[]
          ) => {
            setQuoteForFiles({ quote, files });
            infoToast(
              `${t("dashboard-page:summarize.received-quote")} (${quote})`
            );
          }
        );
      } else {
        // show Payment Required Modal
        console.log("PAYMENT REQUIRED");
        setShowPaymentMethodRequiredModal(true);
      }
    }
  };

  // triggers when file is selected with click
  const handleChange = async function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const paymentMethodsRequest = getAccountPaymentMethodsFactory();
      const paymentMethodsResponse = await paymentMethodsRequest;
      console.log("paymentMethodsResponse", paymentMethodsResponse);
      if (
        (isNumber(get(paymentMethodsResponse, "data.summaryCredits")) &&
          get(paymentMethodsResponse, "data.summaryCredits") > 0) ||
        get(paymentMethodsResponse, "data.stripeDefaultSource")
      ) {
        // account has a payment method (either credits or stripe default source)
        // at least one file has been selected so do something
        setFileList(e.target.files);
        const fileAsTxt: File = await convertFileToTxtFile(e.target.files[0]);
        getSummarizationQuote(
          [fileAsTxt],
          (
            quote: number,
            files: {
              key: string;
              originalName: string;
            }[]
          ) => {
            setQuoteForFiles({ quote, files });
            infoToast(
              `${t("dashboard-page:summarize.received-quote")} (${quote})`
            );
          }
        );
      } else {
        // show Payment Required Modal
        console.log("PAYMENT REQUIRED");
        setShowPaymentMethodRequiredModal(true);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {fileList ? (
        <div className="flex flex-col items-center justify-center">
          <ul className="p-4 sm:p-6 lg:p-8">
            {Object.keys(fileList).map((value: string, index: number) => {
              return (
                <li key={index}>
                  {index} - {fileList[index].name}
                </li>
              );
            })}
          </ul>
          <div>
            <button
              onClick={() => {
                console.log("Summarize");
                console.log("quoteForFiles", quoteForFiles);

                summarizeFiles(
                  quoteForFiles!.files,
                  quoteForFiles?.quote! * 100,
                  (resp: any, err: any) => {
                    if (err) {
                      onError(err);
                      return;
                    }

                    // debugger;

                    const detectedLng = navigatorLangDetector();
                    router.push(`/${detectedLng}/dashboard/queue`);
                    infoToast(
                      t(
                        "toast-messages:files-uploaded-for-summarization-complete"
                      )
                    );
                  }
                );
              }}
              type="button"
              className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 m-1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {t("dashboard-page:summarize.summarize")}{" "}
              {quoteForFiles?.quote && `(${quoteForFiles?.quote})`}
              <ArrowUpOnSquareIcon
                className="-mr-0.5 h-5 w-5"
                aria-hidden="true"
              />
            </button>
            <button
              onClick={() => {
                setFileList(null);
              }}
              type="button"
              className="inline-flex items-center gap-x-2 rounded-md bg-orange-400 m-1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              {t("dashboard-page:summarize.clear")}
              <XCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
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
                        {t("dashboard-page:summarize.upload-a-file")}
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
                    {t("dashboard-page:summarize.upload-limits")}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
