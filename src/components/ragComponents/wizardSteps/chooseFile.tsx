import { XCircleIcon, DocumentIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { getAccountPaymentMethodsFactory } from "@/serviceFactory/getAccountPaymentMethodsFactory";
import isNumber from "lodash.isnumber";
import get from "lodash.get";
import { errorReporter } from "@/utility/error/reporter";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { RightArea } from "../sharedComponents/rightArea";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { enoughUsageCreditsToUsePaidFeatures } from "@/utility/guards/enoughUsageCreditsToUsePaidFeatures";

interface Props {
  file: File | null;
  account: any;
  setFile: Dispatch<SetStateAction<File | null>>;
  setStep: Dispatch<SetStateAction<number>>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function ChooseFile(props: Props) {
  const { file, setFile, setStep, setShowPaymentMethodRequiredModal, account } =
    props;
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [fileLocal, setFileLocal] = useState<File | null>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  console.log("---> account", account);

  useEffect(() => {
    setFileLocal(file);
  }, []);

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

  const handleDrop = async function (e: any) {
    try {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (
        e.dataTransfer.files &&
        e.dataTransfer.files[0] && // TODO needs to be updated to check all files
        ["application/pdf", "text/plain"].includes(
          e.dataTransfer?.items["0"]?.type
        )
      ) {
        if (
          get(account, "customRequestCredits", 0) > 0 ||
          enoughUsageCreditsToUsePaidFeatures(get(account, "usageCredits", 0))
        ) {
          setFileLocal(e.dataTransfer.files[0]);
        } else {
          setShowPaymentMethodRequiredModal(true);
        }
      }
    } catch (e) {
      errorReporter(e);
    }
  };

  const handleChange = async function (e: any) {
    try {
      e.preventDefault();

      // debugger;

      if (e.target.files && e.target.files[0]) {
        const paymentMethodsRequest = getAccountPaymentMethodsFactory();
        const paymentMethodsResponse = await paymentMethodsRequest;

        if (
          (isNumber(get(paymentMethodsResponse, "data.customRequestCredits")) &&
            get(paymentMethodsResponse, "data.customRequestCredits") > 0) ||
          enoughUsageCreditsToUsePaidFeatures(
            get(paymentMethodsResponse, "data.usageCredits")
          )
        ) {
          setFileLocal(e.target.files[0] || null);
        } else {
          setShowPaymentMethodRequiredModal(true);
        }
      }
    } catch (e) {
      errorReporter(e);
    }
  };

  console.log("fileLocal", fileLocal);

  return (
    <Layout3ColumnAndFooterWrapper>
      <_3ColumnWrapper>
        <LeftAreaAndMainWrapper>
          <LeftArea>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              {/* Ability to select from previously uploaded files coming soon
              here... */}
            </p>
          </LeftArea>
          <MainArea>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full flex justify-center">
                <form
                  id="form-file-upload"
                  onDragEnter={handleDrag}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div
                    id="label-file-upload"
                    className={`mt-0 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
                      dragActive ? "drag-active" : ""
                    }`}
                  >
                    <div>
                      <DocumentIcon
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
                            {t("dashboard-page:rag.select-file")}
                            <input
                              ref={inputRef}
                              type="file"
                              id="input-file-upload"
                              multiple={false}
                              onChange={handleChange}
                              accept=".csv"
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
                        {t("dashboard-page:rag.upload-limits")}
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </MainArea>
        </LeftAreaAndMainWrapper>
        <RightArea>
          <ul role="list" className="divide-y divide-gray-100">
            {fileLocal ? (
              <li className="flex items-center justify-between gap-x-6 py-5">
                <div className="flex items-start gap-x-2 truncate">
                  <p className="text-sm font-semibold leading-6 text-gray-900 truncate">
                    {fileLocal.name}
                  </p>
                  <XCircleIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => {
                      // let newFileList = Array.from(fileLocal);
                      // newFileList.splice(index, 1);
                      // console.log(newFileList);
                      setFileLocal(null);
                    }}
                  />
                </div>
              </li>
            ) : null}
          </ul>
        </RightArea>
      </_3ColumnWrapper>
      <FooterWrapper>
        <button
          disabled={!fileLocal}
          onClick={() => {
            setFile(fileLocal!);
            setStep(2);
          }}
          className={`
          ${!fileLocal || fileLocal.length === 0 ? "opacity-50" : "opacity-100"}
          inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          Next
        </button>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
