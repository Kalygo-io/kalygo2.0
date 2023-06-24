import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
import { PreviewTextFile } from "@/components/shared/PreviewTextFile";
import { fileURLToPath } from "url";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  standardFontDataUrl: "standard_fonts/",
};

// type PDFFile = string | File | null;

interface Props {
  file: File | null;
  wizardStepsRef: RefObject<HTMLElement>;
}

export function Query(props: Props) {
  const { file, wizardStepsRef } = props;

  const [numPages, setNumPages] = useState<number>();
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

      if (file && file.type === "application/pdf") {
        const reader = new FileReader();
        reader.addEventListener("loadend", async () => {
          const loadingTask = pdfjs.getDocument(reader.result as ArrayBuffer);

          loadingTask.promise.then(async function (pdf) {
            // you can now use *pdf* here
            const maxPages = pdf.numPages;
            var countPromises = []; // collecting all page promises
            for (var j = 1; j <= maxPages; j++) {
              var page = pdf.getPage(j);

              var txt = "";
              countPromises.push(
                page.then(function (page) {
                  // add page promise
                  var textContent = page.getTextContent();
                  return textContent.then(function (text) {
                    // return content promise
                    return text.items
                      .map(function (s: any) {
                        return s.str;
                      })
                      .join(""); // value page text
                  });
                })
              );
            }

            const finalText = await Promise.all(countPromises).then(function (
              texts
            ) {
              return texts.join("");
            });

            var blob = new Blob([finalText], { type: "text/plain" });
            var pdf2txtFile = new File([blob], "pdf2txt.txt", {
              type: "text/plain",
            });

            similaritySearchInFile(
              data.query,
              pdf2txtFile,
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
          });
        });

        reader.readAsDataURL(file as Blob);
      } else {
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
      }
    } catch (e) {
      setSearchResultsState({
        val: null,
        loading: false,
        err: e,
      });
    }
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
              <CopyToClipboard text={i} onCopy={() => console.log("copied")}>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600 cursor-pointer">
                  {i}
                </p>
              </CopyToClipboard>
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
          className={`px-4 py-2 sm:px-6 lg:pl-8 xl:pl-6 overflow-scroll mx-1 flex flex-col justify-start items-center w-full shadow-sm rounded-md border-2`}
        >
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
      );
      break;
    case "text/plain":
      //   debugger;

      viewer = (
        <div
          className={`px-4 py-2 sm:px-6 lg:pl-8 xl:pl-6 overflow-scroll mx-1 flex w-full shadow-sm rounded-md border-2`}
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

          {/* Main area */}
          {viewer}
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
