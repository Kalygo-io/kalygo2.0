import React, { RefObject, useState } from "react";
import { useTranslation } from "next-i18next";
import { errorToast, infoToast } from "@/utility/toasts";
import { useForm } from "react-hook-form";
import { navigatorLangDetector } from "@/lib/languageDetector";
import { useRouter } from "next/router";
import { customRequestFactory } from "@/serviceFactory/customRequestFactory";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { RightArea } from "../sharedComponents/rightArea";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { ScanningMode } from "@/types/ScanningMode";
import { EachFileInChunksPrompts } from "./reviewComponents/EachFileInChunksPrompts";
import { EachFileOverallPrompts } from "./reviewComponents/EachFileOverallPrompts";
import { OverallPrompts } from "./reviewComponents/OverallPrompts";
import { EachFilePerPagePrompts } from "./reviewComponents/EachFilePerPagePrompts";

interface Props {
  customizations: {
    mode: string;
    model: "gpt-3.5-turbo" | "gpt-4o" | "gpt-4o-mini";
    prompt?: string;
    finalPrompt?: string;
    overallPrompt?: string;
    includeFinalPrompt?: boolean;
  } | null;
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
              {t("dashboard-page:custom-request-v2.chosen-files")!}
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
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight text-center">
              {t("dashboard-page:custom-request-v2.customizations")!}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="col-span-full">
                <form>
                  <div className="mt-2">
                    {customizations?.mode ===
                      ScanningMode.EACH_FILE_OVERALL && (
                      <EachFileOverallPrompts
                        includeFinalPrompt={
                          customizations.includeFinalPrompt as boolean
                        }
                        prompt={customizations.prompt as string}
                        finalPrompt={customizations.finalPrompt as string}
                      />
                    )}
                    {customizations?.mode ===
                      ScanningMode.EACH_FILE_IN_CHUNKS && (
                      <EachFileInChunksPrompts
                        prompt={customizations.prompt as string}
                      />
                    )}
                    {customizations?.mode === ScanningMode.OVERALL && (
                      <OverallPrompts
                        prompt={customizations.prompt as string}
                        finalPrompt={customizations.finalPrompt as string}
                        overallPrompt={customizations.overallPrompt as string}
                      />
                    )}

                    {customizations?.mode ===
                      ScanningMode.EACH_FILE_PER_PAGE && (
                      <EachFilePerPagePrompts
                        prompt={customizations.prompt as string}
                      />
                    )}
                    <div className="text-center">
                      {!customizations?.mode && (
                        <span className="text-gray-400">
                          No customizations yet
                        </span>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </MainArea>
        </LeftAreaAndMainWrapper>
        <RightArea>
          <p className="mt-1 text-sm leading-6 text-gray-400 text-center">
            Click &apos;Send&apos; to process your request
          </p>
        </RightArea>
      </_3ColumnWrapper>
      <FooterWrapper>
        <button
          onClick={async () => {
            try {
              console.log("customizations", customizations);
              const customRequest = customRequestFactory(customizations, files);
              const customRequestResponse = await customRequest;
              console.log("customRequestResponse", customRequestResponse);

              const detectedLng = navigatorLangDetector();
              router.push(`/${detectedLng}/dashboard/queue`);
              infoToast(t("toast-messages:custom-request-is-processing"));
            } catch (e: any) {
              errorToast(e.toString());
            }
          }}
          disabled={files.length === 0 || customizations?.prompt === ""}
          className={`${
            files.length === 0 || customizations?.prompt === ""
              ? "opacity-50"
              : "opacity-100"
          } mt-2 flex justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          {t("dashboard-page:custom-request-v2.send")!}
        </button>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
