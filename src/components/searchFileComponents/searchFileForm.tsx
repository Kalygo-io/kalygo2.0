import { uploadFile } from "@/services/uploadFile";
import {
  XCircleIcon,
  PhotoIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import React, { useState } from "react";
import get from "lodash.get";

import { useTranslation } from "next-i18next";

import { infoToast } from "@/utility/toasts";
import { useForm, Controller } from "react-hook-form";
import { similaritySearchInFile } from "@/services/similaritySearchInFile";

import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  standardFontDataUrl: "standard_fonts/",
};

type PDFFile = string | File | null;

interface Props {
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
  setSearchResultsState: (state: any) => void;
  onError: (err: any) => void;
}

export function SearchFileForm(props: Props) {
  const { onSuccess, onError, setSearchResultsState } = props;

  const [file, setFile] = useState<PDFFile>();
  const [numPages, setNumPages] = useState<number>();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({});

  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>();

  const { t } = useTranslation();

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);

    console.log("data.file", data.file[0]);

    setSearchResultsState({
      val: null,
      loading: true,
      err: null,
    });

    similaritySearchInFile(
      data.query,
      data.file,
      (results: string[], err: any) => {
        if (err) {
          onError(err);
        } else {
          onSuccess({
            results,
            query: data.query,
          });
        }
      }
    );
  };

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <header>
          <h1>PDF viewer</h1>
        </header>

        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>{" "}
            <input onChange={onFileChange} type="file" />
          </div>
          <div className="Example__container__document">
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

        {/* <div className="col-span-full flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <textarea
                {...register("query", { required: true })}
                rows={3}
                id="query"
                placeholder="Perform a similarity search..."
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                  errors["query"] && "ring-red-700 focus:ring-red-500"
                }`}
              />
            </div>
            <div className="col-span-full">
              <div className="mt-2 flex items-center gap-x-3">
                <input
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900"
                  {...register("file", {
                    required: true,
                  })}
                  multiple
                  accept=".pdf,.txt"
                  type="file"
                  id="file"
                />
              </div>
            </div>

            <div>
              <button className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 m-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Search
              </button>
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
}
