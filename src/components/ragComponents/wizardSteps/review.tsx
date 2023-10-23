import React, { Dispatch, RefObject, SetStateAction, useState } from "react";
import { useTranslation } from "next-i18next";
import { errorToast, infoToast } from "@/utility/toasts";
import { useForm } from "react-hook-form";
import { navigatorLangDetector } from "@/lib/languageDetector";
import { useRouter } from "next/router";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { RightArea } from "../sharedComponents/rightArea";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { ragRequestWithQueueFactory } from "@/serviceFactory/ragRequestWithQueueFactory";

interface Props {
  customizations: Record<string, string> | null;
  file: File | null;
  wizardStepsRef: RefObject<HTMLElement>;
  setStep: Dispatch<SetStateAction<number>>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function Review(props: Props) {
  const {
    customizations,
    file,
    wizardStepsRef,
    setShowPaymentMethodRequiredModal,
    setStep,
  } = props;

  const [numPages, setNumPages] = useState<number>();
  const router = useRouter();
  const { t } = useTranslation();

  const {
    formState: { errors },
  } = useForm({});

  const [searchState, setSearchState] = useState<{
    val: any;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: false,
    err: null,
  });

  return (
    <Layout3ColumnAndFooterWrapper>
      <_3ColumnWrapper>
        <LeftAreaAndMainWrapper>
          <LeftArea>
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
              {t("dashboard-page:rag.chosen-file")!}
            </h2>
            {file ? (
              <ul role="list" className="divide-y divide-gray-100">
                <li className="flex items-center justify-between gap-x-6">
                  <div className="flex items-start gap-x-3 truncate">
                    <p className="text-sm font-semibold leading-6 text-gray-900 truncate">
                      {file.name}
                    </p>
                  </div>
                </li>
              </ul>
            ) : (
              <p className="mt-1 text-sm leading-6 text-gray-400">
                No file selected
              </p>
            )}
          </LeftArea>
          <MainArea>
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight text-center">
              {t("dashboard-page:rag.customizations")!}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="col-span-full text-center">
                {customizations ? (
                  <ul className="m-1">
                    {Object.keys(customizations).map((c, idx) => {
                      return (
                        <li key={c} className="truncate text-ellipsis">
                          {customizations[c]}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    No customizations provided
                  </p>
                )}
              </div>
            </div>
          </MainArea>
        </LeftAreaAndMainWrapper>
        <RightArea>
          <p className="mt-1 text-sm leading-6 text-gray-400 text-center">
            Click &apos;Send&apos; to process your R.A.G. request
          </p>
        </RightArea>
      </_3ColumnWrapper>
      <FooterWrapper>
        <>
          <button
            onClick={() => {
              setStep(2);
            }}
            className={`opacity-100 inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
          >
            Back
          </button>
          <button
            onClick={async () => {
              try {
                console.log("file", file);
                console.log("customizations", customizations);

                const ragRequest = ragRequestWithQueueFactory(
                  customizations,
                  file!
                );
                const ragRequestResponse = await ragRequest;
                console.log("ragRequestResponse", ragRequestResponse);
                const detectedLng = navigatorLangDetector();
                router.push(`/${detectedLng}/dashboard/queue`);
                infoToast(t("toast-messages:rag-request-is-processing"));
              } catch (e: any) {
                errorToast(e.toString());
              }
            }}
            disabled={!file || customizations?.prompt === ""}
            className={`${
              !file || customizations?.prompt === ""
                ? "opacity-50"
                : "opacity-100"
            } flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
          >
            {t("dashboard-page:rag.send")!}
          </button>
        </>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
