import React, { RefObject, useState } from "react";
import { useTranslation } from "next-i18next";
import { errorToast, infoToast } from "@/utility/toasts";
import { getSummarizationQuote } from "@/services/getSummarizationQuote";
import { navigatorLangDetector } from "@/lib/languageDetector";
import { useRouter } from "next/router";
import { customSummaryFactory } from "@/serviceFactory/customSummaryFactory";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { RightArea } from "../sharedComponents/rightArea";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";

interface Props {
  customizations: Record<string, string> | null;
  files: File[];
  wizardStepsRef: RefObject<HTMLElement>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function Review(props: Props) {
  const {
    customizations,
    files,
    wizardStepsRef,
    setShowPaymentMethodRequiredModal,
  } = props;

  const router = useRouter();
  const { t } = useTranslation();

  const [request, setRequest] = useState<{
    loading: boolean;
    val: any;
    err: any;
  }>({
    loading: false,
    val: null,
    err: null,
  });

  return (
    <Layout3ColumnAndFooterWrapper>
      <_3ColumnWrapper>
        <LeftAreaAndMainWrapper>
          <LeftArea>
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
              {t("dashboard-page:summarize-v2.chosen-files")!}
            </h2>
            {files.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-100">
                {Object.keys(files).map((value: string, index: number) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-x-6 py-5"
                    >
                      <div className="flex items-start gap-x-3 truncate">
                        <p className="text-sm font-semibold leading-6 text-gray-900 truncate">
                          {files[index].name}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-1 text-sm leading-6 text-gray-400">
                No files selected
              </p>
            )}
          </LeftArea>

          <MainArea>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                {t("dashboard-page:summarize-v2.customizations")!}
              </h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                <div className="col-span-full">
                  {customizations ? (
                    <ul className="m-4">
                      {Object.keys(customizations).map((c, idx) => {
                        return <li key={c}> {customizations[c]}</li>;
                      })}
                    </ul>
                  ) : (
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      No customizations provided
                    </p>
                  )}
                </div>
              </div>
            </div>
          </MainArea>
        </LeftAreaAndMainWrapper>
        <RightArea>
          <p className="mt-1 text-sm leading-6 text-gray-400 text-center">
            {/* A quote of the total cost of the request will be displayed here when
            feature development is complete... */}
            Click summarize to process your request
          </p>
        </RightArea>
      </_3ColumnWrapper>

      <FooterWrapper>
        <>
          {/* <button className="flex items-center justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Back
          </button> */}
          <button
            onClick={async () => {
              try {
                console.log("customSummary RUN", customizations);

                setRequest({
                  val: null,
                  loading: true,
                  err: null,
                });

                const customRequest = customSummaryFactory(
                  customizations!,
                  files
                );
                const customRequestResponse = await customRequest;
                console.log("customSummaryResponse", customRequestResponse);

                const detectedLng = navigatorLangDetector();
                router.push(`/${detectedLng}/dashboard/queue`);
                infoToast(t("toast-messages:summary-v2-is-processing"));
              } catch (e: any) {
                errorToast(e.toString());

                setRequest({
                  val: null,
                  loading: false,
                  err: e,
                });
              }
            }}
            disabled={files.length === 0 || !customizations || request.loading}
            className={`${
              files.length === 0 || !customizations || request.loading
                ? "opacity-50"
                : "opacity-100"
            } flex items-center justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
          >
            {request.loading
              ? t("dashboard-page:summarize-v2.loading")
              : t("dashboard-page:summarize-v2.summarize")!}
          </button>
        </>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
