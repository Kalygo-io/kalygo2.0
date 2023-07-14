import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import React, { useState } from "react";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { infoToast } from "@/utility/toasts";
import type { PDFDocumentProxy } from "pdfjs-dist";

const options = {
  cMapUrl: "cmaps/",
  standardFontDataUrl: "standard_fonts/",
};

type PDFFile = string | File | null;

interface Props {
  onSuccess: ({ results, query }: { results: string[]; query: string }) => void;
  setSearchResultsState: (state: any) => void;
  onError: (err: any) => void;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function CustomRequestForm(props: Props) {
  const { onSuccess, onError, setSearchResultsState } = props;

  const [file, setFile] = useState<PDFFile>();
  const [numPages, setNumPages] = useState<number>();

  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>();

  const { t } = useTranslation();

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
      </div>
    </div>
  );
}
