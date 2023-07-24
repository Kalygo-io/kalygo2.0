import React, { RefObject } from "react";
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

  return (
    <Layout3ColumnAndFooterWrapper>
      <_3ColumnWrapper>
        <LeftAreaAndMainWrapper>
          <LeftArea>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
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
                        <div className="flex items-start gap-x-3">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
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
            </div>
          </LeftArea>

          <MainArea>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
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
          <p className="mt-1 text-sm leading-6 text-gray-400">
            A quote of the total cost of the request will be displayed here when
            feature development is complete...
          </p>
        </RightArea>
      </_3ColumnWrapper>

      <FooterWrapper>
        <button
          onClick={async () => {
            try {
              console.log("customSummary RUN", customizations);

              const customRequest = customSummaryFactory(
                customizations!,
                files
              );
              const customRequestResponse = await customRequest;
              console.log("customSummaryResponse", customRequestResponse);

              const detectedLng = navigatorLangDetector();
              router.push(`/${detectedLng}/dashboard/queue`);
              infoToast(t("toast-messages:custom-summary-is-processing"));
            } catch (e: any) {
              errorToast(e.toString());
            }
          }}
          disabled={files.length === 0 || !customizations}
          className={`${
            files.length === 0 || !customizations ? "opacity-50" : "opacity-100"
          } flex items-center justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          {t("dashboard-page:summarize-v2.summarize")!}
        </button>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
