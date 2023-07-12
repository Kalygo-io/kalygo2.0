import { summarizeFiles } from "@/services/summarizeFiles";
import {
  XCircleIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { errorToast, infoToast } from "@/utility/toasts";
import { getSummarizationQuote } from "@/services/getSummarizationQuote";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { convertFileToTxtFile } from "./convertFileToTxtFile";
import { navigatorLangDetector } from "@/lib/languageDetector";
import { customRequestFactory } from "@/serviceFactory/customRequestFactory";
import get from "lodash.get";
import isNumber from "lodash.isnumber";
import { useForm } from "react-hook-form";
import { getAccountPaymentMethodsFactory } from "@/serviceFactory/getAccountPaymentMethodsFactory";

interface Props {
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
  onError: (err: any) => void;
}

export function CustomRequestOnFilesForm(props: Props) {
  const { onError, setShowPaymentMethodRequiredModal } = props;

  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>();
  const [quoteForFiles, setQuoteForFiles] = useState<{
    quote: number;
    files: { key: string; originalName: string }[];
  } | null>();
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      prompt: "",
      "files-to-upload": null,
    },
  });

  // ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = async (data: any) => {
    try {
      console.log("customRequest submit", data);

      const customRequest = customRequestFactory(
        data.prompt,
        data["files-to-upload"]
      );
      const customRequestResponse = await customRequest;
      console.log("customRequestResponse", customRequestResponse);

      const detectedLng = navigatorLangDetector();
      router.push(`/${detectedLng}/dashboard/queue`);
      infoToast(t("toast-messages:custom-request-is-processing"));
    } catch (e: any) {
      errorToast(e.toString());
    }
  };

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
      const paymentMethodsRequest = getAccountPaymentMethodsFactory();
      const paymentMethodsResponse = await paymentMethodsRequest;
      console.log("paymentMethodsResponse", paymentMethodsResponse);
      if (
        (isNumber(get(paymentMethodsResponse, "data.customRequestCredits")) &&
          get(paymentMethodsResponse, "data.customRequestCredits") > 0) ||
        get(paymentMethodsResponse, "data.stripeDefaultSource")
      ) {
        // account has a payment method (either credits or stripe default source)
        setFileList(e.dataTransfer.files);

        // const fileAsTxt: File = await convertFileToTxtFile(
        //   e.dataTransfer.files[0]
        // );
        // getSummarizationQuote(
        //   [fileAsTxt],
        //   (
        //     quote: number,
        //     files: {
        //       key: string;
        //       originalName: string;
        //     }[]
        //   ) => {
        //     setQuoteForFiles({ quote, files });
        //     infoToast(
        //       `${t("dashboard-page:summarize.received-quote")} (${quote})`
        //     );
        //   }
        // );
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
        (isNumber(get(paymentMethodsResponse, "data.customRequestCredits")) &&
          get(paymentMethodsResponse, "data.customRequestCredits") > 0) ||
        get(paymentMethodsResponse, "data.stripeDefaultSource")
      ) {
        // account has a payment method (either credits or stripe default source)
        // at least one file has been selected so do something
        setFileList(e.target.files);

        setValue("files-to-upload", e.target.files);

        // inputRef.current.value.put(e.target.files);

        // const fileAsTxt: File = await convertFileToTxtFile(e.target.files[0]);
        // getSummarizationQuote(
        //   [fileAsTxt],
        //   (
        //     quote: number,
        //     files: {
        //       key: string;
        //       originalName: string;
        //     }[]
        //   ) => {
        //     setQuoteForFiles({ quote, files });
        //     infoToast(
        //       `${t("dashboard-page:summarize.received-quote")} (${quote})`
        //     );
        //   }
        // );
      } else {
        // show Payment Required Modal
        console.log("PAYMENT REQUIRED");
        setShowPaymentMethodRequiredModal(true);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full flex justify-center">
          <form
            id="custom-request-on-files-form"
            onDragEnter={handleDrag}
            onSubmit={handleSubmit(onSubmit)}
          >
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
                    t("dashboard-page:custom-request.prompt-placeholder-text")!
                  }
                  rows={4}
                  name="prompt"
                  id="prompt"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {fileList ? (
              <>
                <ul className="p-4 sm:p-6 lg:p-8">
                  {Object.keys(fileList).map((value: string, index: number) => {
                    return (
                      <li key={index}>
                        {index} - {fileList[index].name}
                      </li>
                    );
                  })}
                </ul>
                <button
                  onClick={() => {
                    setFileList(null);
                    setValue("files-to-upload", null);
                  }}
                  type="button"
                  className="inline-flex items-center gap-x-2 rounded-md bg-white m-1 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  {t("dashboard-page:summarize.clear")}
                  <XCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                </button>
              </>
            ) : (
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

                  <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="files-to-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                    >
                      <span>
                        {t("dashboard-page:custom-request.select-files")}
                      </span>
                      <input
                        {...register("files-to-upload", {
                          required: true,
                        })}
                        ref={inputRef}
                        type="file"
                        id="files-to-upload"
                        multiple={true}
                        onChange={handleChange}
                        accept=".pdf,.txt"
                        className="sr-only"
                      />
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
                    {t("dashboard-page:custom-request.upload-limits")}
                  </p>
                </div>
              </div>
            )}

            <div>
              <button className="mt-2 flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                {t("dashboard-page:custom-request.run")!}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
