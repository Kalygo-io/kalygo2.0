import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import React, { RefObject, useCallback, useRef, useState } from "react";
import get from "lodash.get";

import { useTranslation } from "next-i18next";

import { infoToast } from "@/utility/toasts";
import { useForm } from "react-hook-form";
import { similaritySearchInFile } from "@/services/similaritySearchInFile";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { PreviewTextFile } from "@/components/shared/PreviewTextFile";
import { useResize } from "@/components/shared/hooks/useResize";
import { performOcrOnDocumentFactory } from "@/serviceFactory/performOcrOnDocumentFactory";

const options = {
  cMapUrl: "cmaps/",
  standardFontDataUrl: "standard_fonts/",
};

interface Props {
  file: File | null;
  wizardStepsRef: RefObject<HTMLElement>;
}

export function Query(props: Props) {
  const { file, wizardStepsRef } = props;

  const [numPages, setNumPages] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const { t } = useTranslation();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const size = useResize(parentRef);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({});

  const [searchText, setSearchText] = useState("");

  const [ocrResult, setOcrResult] = useState<{
    val: any;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: false,
    err: null,
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("loading...");
      console.log("file", file);

      setOcrResult({
        val: null,
        loading: true,
        err: null,
      });

      const request = await performOcrOnDocumentFactory(file!);
      const response = await request;

      infoToast("OCR successfully completed");

      setOcrResult({
        val: null,
        loading: false,
        err: null,
      });
    } catch (e) {
      setOcrResult({
        val: null,
        loading: false,
        err: e,
      });
    }
  };

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages);
  }

  let jsx = null;
  if (ocrResult.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (ocrResult.val) {
    jsx = (
      <ul role="list" className="divide-y divide-gray-100">
        <pre>{ocrResult?.val}</pre>
      </ul>
    );
  }

  let viewer = null;
  switch (file && file.type) {
    case "application/pdf":
      viewer = (
        <div
          ref={parentRef}
          className={`px-0 py-2 flex flex-col justify-start items-center overflow-scroll shadow-sm`}
        >
          <span className="isolate inline-flex rounded-md shadow-sm m-2">
            <button
              onClick={() =>
                setPage((prevState) =>
                  prevState > 1 ? prevState - 1 : prevState
                )
              }
              type="button"
              className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() =>
                setPage((prevState) =>
                  prevState <= (numPages ? numPages - 1 : 0)
                    ? prevState + 1
                    : prevState
                )
              }
              type="button"
              className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </span>
          <Document
            className="w-full max-h-screen"
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page
              key={`page_${page}`}
              width={size?.width}
              pageNumber={page}
              className="w-full max-h-screen"
            />
          </Document>
        </div>
      );
      break;
    case "text/plain":
      viewer = (
        <div
          className={`px-0 py-2 sm:px-6 overflow-scroll mx-1 flex w-full shadow-sm`}
        >
          <PreviewTextFile file={file} />
        </div>
      );
      break;
    default:
      viewer = <>Unsupported file type</>;
      break;
  }

  return (
    <div className="flex min-h-full flex-col">
      {/* 3 column wrapper */}
      <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        {/* <div className="flex-1 basis-2/3 xl:flex"> */}
        <div className="flex-1 xl:flex">
          <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
            {/* Left column area */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center"
            >
              <div>
                <button
                  disabled={!file}
                  className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 m-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Perform OCR
                  {/* <MagnifyingGlassIcon className="h-4 w-4" /> */}
                </button>
              </div>
            </form>
            {jsx}
          </div>

          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            {viewer}
          </div>
        </div>

        {/* <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6"> */}
        <div className="m-4 shrink-0 px-4 py-6 sm:px-6 lg:flex-1 lg:pr-8 xl:pr-6 border-t border-gray-200 lg:border-l lg:border-t-0">
          {/* Right column area */}
        </div>
      </div>
    </div>
  );
}
