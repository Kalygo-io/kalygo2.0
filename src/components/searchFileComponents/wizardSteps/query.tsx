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

  const [searchResults, setSearchResultsState] = useState<{
    val: {
      results: string[];
      query: string;
    } | null;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: false,
    err: null,
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("onSubmit", data);
      console.log("file", file);

      setSearchResultsState({
        val: null,
        loading: true,
        err: null,
      });

      similaritySearchInFile(
        data.query,
        file!,
        (results: string[], err: any) => {
          if (err) {
            setSearchResultsState({
              val: null,
              loading: false,
              err: err,
            });
          } else {
            infoToast("Successfully performed similarity search");

            console.log("RESULTS", results);

            setSearchResultsState({
              val: {
                results,
                query: data.query,
              },
              loading: false,
              err: null,
            });
          }
        }
      );
    } catch (e) {
      setSearchResultsState({
        val: null,
        loading: false,
        err: e,
      });
    }
  };

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages);
  }

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
            <div className="flex-auto">
              <div className="flex items-baseline justify-between gap-x-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Chunk {get(metadatas, `${idx}.index`)}, Page{" "}
                  {get(metadatas, `${idx}.pageNumber`)}
                </p>
                <p className="flex-none text-xs text-gray-600">
                  <span>{distances[idx]}</span>
                </p>
              </div>

              <p
                className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600 cursor-pointer"
                onClick={() => {
                  switch (file && file.type) {
                    case "application/pdf":
                      setPage(get(metadatas, `${idx}.pageNumber`, page));
                      navigator.clipboard.writeText(i);
                      break;
                    case "text/plain":
                      navigator.clipboard.writeText(i);
                      break;
                    default:
                      break;
                  }
                }}
              >
                {i}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  let viewer = null;
  switch (file && file.type) {
    case "application/pdf":
      viewer = (
        <div
          ref={parentRef}
          // className={`px-4 py-0 sm:px-6 lg:pl-8 xl:pl-6 mx-1 flex flex-col justify-start items-center overflow-scroll shadow-sm rounded-md border-2`}
          className={`px-4 py-0 sm:px-6 lg:pl-8 xl:pl-6 mx-1 flex flex-col justify-start items-center overflow-scroll shadow-sm`}
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
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page key={`page_${page}`} width={size?.width} pageNumber={page} />
          </Document>
        </div>
      );
      break;
    case "text/plain":
      viewer = (
        <div
          // className={`px-4 py-2 sm:px-6 lg:pl-8 xl:pl-6 overflow-scroll mx-1 flex w-full shadow-sm rounded-md border-2`}
          className={`px-4 py-2 sm:px-6 lg:pl-8 xl:pl-6 overflow-scroll mx-1 flex w-full shadow-sm`}
        >
          <PreviewTextFile file={file} />
        </div>
      );
      break;
    default:
      viewer = <>Unsupported file type</>;
      break;
  }

  console.log("searchText", searchText);

  return (
    <div className="flex min-h-full flex-col">
      {/* <div className="m-4 mb-0 pb-4 mx-auto w-full max-w-7xl grow lg:flex xl:px-2 border-b border-black"></div> */}
      <div className="m-4 lg:grid grid-cols-3 flex flex-col grid-rows-1">
        <div className="px-4 py-4 flex justify-center max-w-full mx-auto lg:order-1 order-2 col-span-2">
          {viewer}
        </div>

        {/* <div className="m-4 px-4 py-6 shrink-0 border-b lg:border-gray-200 lg:border-l lg:border-b-0 lg:pr-8 xl:pr-4 lg:order-2 order-1 col-span-1 overflow-scroll rounded-md border-2"> */}
        <div className="m-4 px-4 py-6 shrink-0 border-b lg:border-gray-200 lg:border-l lg:border-b-0 lg:pr-8 xl:pr-4 lg:order-2 order-1 col-span-1 overflow-scroll">
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
              <button
                disabled={!file}
                className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 m-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
          {jsx}
        </div>
      </div>
    </div>
  );
}
