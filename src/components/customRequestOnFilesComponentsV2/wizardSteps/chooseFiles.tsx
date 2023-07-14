import {
  XCircleIcon,
  PhotoIcon,
  ArrowUpOnSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "next-i18next";

import { infoToast } from "@/utility/toasts";
import { useForm, Controller } from "react-hook-form";
import { similaritySearchInFile } from "@/services/similaritySearchInFile";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { getAccountPaymentMethodsFactory } from "@/serviceFactory/getAccountPaymentMethodsFactory";
import isNumber from "lodash.isnumber";
import get from "lodash.get";

const options = {
  cMapUrl: "cmaps/",
  standardFontDataUrl: "standard_fonts/",
};

type PDFFile = string | File | null;

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
  const [fileList, setFileList] = useState<FileList | null>();
  const [quoteForFile, setQuoteForFile] = useState<{
    quote: number;
    filePath: string;
  } | null>();

  // ref
  const inputRef = React.useRef<HTMLInputElement>(null);

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
      setFiles(e.dataTransfer.files || null);
      setStep(2);
    }
  };

  // triggers when file is selected with click
  const handleChange = async function (e: any) {
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
        // setFileList(e.target.files);
        setFiles(e.target.files || null);
        setStep(2);
      } else {
        // show Payment Required Modal
        console.log("PAYMENT REQUIRED");
        setShowPaymentMethodRequiredModal(true);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      {/* 3 column wrapper */}
      <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          {/* <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6"> */}
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:w-96 xl:shrink-0 xl:pl-6">
            {/* Left column area */}
            {/* LEFT */}
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
                            {t("dashboard-page:custom-request-v2.select-files")}
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
                        {t("dashboard-page:custom-request-v2.upload-limits")}
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
          {/* RIGHT */}
        </div>
      </div>
    </div>
  );
}
