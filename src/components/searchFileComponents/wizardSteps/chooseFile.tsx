import { uploadFile } from "@/services/uploadFile";
import {
  XCircleIcon,
  PhotoIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import React, { Dispatch, SetStateAction, useState } from "react";
import get from "lodash.get";

import { useTranslation } from "next-i18next";

import { infoToast } from "@/utility/toasts";
import { getSummarizationQuote } from "@/services/getSummarizationQuote";
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
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  setStep: Dispatch<SetStateAction<number>>;
  //   onSuccess: ({
  //     results,
  //     query,
  //   }: // fileName,
  //   // originalLength,
  //   // condensedLength,
  //   {
  //     results: string[];
  //     query: string;
  //     // fileName: string;
  //     // originalLength: number;
  //     // condensedLength: number;
  //   }) => void;
  //   setSearchResultsState: (state: any) => void;
  //   onError: (err: any) => void;
}

export function ChooseFile(props: Props) {
  const {
    file,
    setFile,
    setStep,
    // onSuccess, onError, setSearchResultsState
  } = props;

  //   const [file, setFile] = useState<PDFFile>();
  const [numPages, setNumPages] = useState<number>();

  //   const {
  //     register,
  //     handleSubmit,
  //     getValues,
  //     formState: { errors },
  //     setValue,
  //     watch,
  //   } = useForm({});

  const [dragActive, setDragActive] = useState(false);
  //   const [fileList, setFileList] = useState<FileList | null>();

  const { t } = useTranslation();

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    // debugger;

    if (files && files[0]) {
      setFile(files[0] || null);
      setStep(2);
    }
  }

  //   function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
  //     setNumPages(nextNumPages);
  //   }

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* <header>
          <h2>Choose file</h2>
        </header> */}

        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Select file:</label>{" "}
            <input accept=".pdf,.txt" onChange={onFileChange} type="file" />
          </div>
          {/* <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div> */}
        </div>
      </div>
    </div>
  );
}
