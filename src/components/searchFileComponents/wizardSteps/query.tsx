import { uploadFile } from "@/services/uploadFile";
import {
  XCircleIcon,
  PhotoIcon,
  ArrowUpOnSquareIcon,
  DocumentMagnifyingGlassIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import React, { Ref, RefObject, useState } from "react";
import get from "lodash.get";

import { useTranslation } from "next-i18next";

import { infoToast } from "@/utility/toasts";
import { getSummarizationQuote } from "@/services/getSummarizationQuote";
import { useForm, Controller } from "react-hook-form";
import { similaritySearchInFile } from "@/services/similaritySearchInFile";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { WindowLoader } from "@/components/shared/WindowLoader";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  standardFontDataUrl: "standard_fonts/",
};

type PDFFile = string | File | null;

interface Props {
  file: File | null;
  wizardStepsRef: RefObject<HTMLElement>;
  onSuccess: ({
    results,
    query,
  }: // fileName,
  // originalLength,
  // condensedLength,
  {
    results: string[];
    query: string;
    // fileName: string;
    // originalLength: number;
    // condensedLength: number;
  }) => void;
  //   setSearchResultsState: (state: any) => void;
  onError: (err: any) => void;
}

export function Query(props: Props) {
  const { file, wizardStepsRef, onSuccess, onError } = props;

  const [numPages, setNumPages] = useState<number>();
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({});

  const [searchResults, setSearchResultsState] = useState<{
    val: {
      results: string[];
      query: string;
    } | null;
    loading: boolean;
    err: Error | null;
  }>({
    val: null,
    loading: false,
    err: null,
  });

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);
    console.log("file", file);

    setSearchResultsState({
      val: null,
      loading: true,
      err: null,
    });

    similaritySearchInFile(data.query, file!, (results: string[], err: any) => {
      if (err) {
        onError(err);
      } else {
        // onSuccess({
        //   results,
        //   query: data.query,
        // });

        setSearchResultsState({
          val: {
            results,
            query: data.query,
          },
          loading: false,
          err: null,
        });
      }
    });
  };

  //   function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  //     const { files } = event.target;

  //     if (files && files[0]) {
  //       setFile(files[0] || null);
  //     }
  //   }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages);
  }

  //   console.log(
  //     "wizardStepsRef.current.clientHeight",
  //     wizardStepsRef?.current?.clientHeight
  //   );

  const documents = get(searchResults, "val.results.documents.0", []);
  const distances = get(searchResults, "val.results.distances.0", []);
  const metadatas = get(searchResults, "val.results.metadatas.0", []);

  let jsx = null;
  if (searchResults.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (searchResults.val) {
    jsx = (
      <ul role="list" className="divide-y divide-gray-100">
        {documents.map((i, idx) => (
          <li key={idx} className="flex gap-x-4 py-5">
            {/* <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={comment.imageUrl}
                  alt=""
                /> */}
            <div className="flex-auto">
              <div className="flex items-baseline justify-between gap-x-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Chunk {get(metadatas, `${idx}.index`)}
                </p>
                <p className="flex-none text-xs text-gray-600">
                  <span>{distances[idx]}</span>
                  {/* <time dateTime={comment.dateTime}>{comment.date}</time> */}
                </p>
              </div>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                {i}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div
        className="lg:grid grid-cols-3 flex flex-col grid-rows-1 pt-8"
        style={{
          height: `calc(100vh - ${
            wizardStepsRef?.current?.clientHeight! + 88 + 64
          }px)`, // 88 is the top nav && p8 == 2rem == 64px of padding to adjust for the padding around the <main></main> panel
        }}
      >
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 flex lg:order-1 order-2 col-span-2">
          {/* <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
            Left column area
          </div> */}

          <div
            className={`px-4 py-2 sm:px-6 lg:pl-8 xl:pl-6 overflow-scroll mx-1 flex flex-col justify-center items-center w-full`}
          >
            {/* Main area */}
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </div>

        <div className="shrink-0 border-b lg:border-gray-200 px-4 lg:border-l lg:border-b-0 lg:pr-8 xl:pr-4 lg:order-2 order-1 col-span-1 overflow-scroll">
          {/* Right column area */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center w-full"
          >
            <textarea
              {...register("query", { required: true })}
              rows={1}
              id="query"
              placeholder="Similarity search"
              className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                errors["query"] && "ring-red-700 focus:ring-red-500"
              }`}
            />

            <div>
              <button className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 m-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
          {jsx}
        </div>
      </div>
    </>
  );
}
