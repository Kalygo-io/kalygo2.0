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

interface Props {
  prompt: string;
  files: File[];
  wizardStepsRef: RefObject<HTMLElement>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function Review(props: Props) {
  const { prompt, files, wizardStepsRef, setShowPaymentMethodRequiredModal } =
    props;

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
            <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
              {t("dashboard-page:custom-request-v2.provided-request")!}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="col-span-full">
                <form>
                  <div>
                    <div className="mt-2">
                      <textarea
                        readOnly
                        defaultValue={prompt || "No prompt provided"}
                        rows={4}
                        name="prompt"
                        id="prompt"
                        className={`block w-full rounded-md border-0 py-1.5 ${
                          prompt ? "text-gray-800" : "text-gray-400"
                        } shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </MainArea>
        </LeftAreaAndMainWrapper>
        <RightArea>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            {/* A quote of the total cost of the request will be displayed here when
            feature development is complete... */}
            Click send to process your request
          </p>
        </RightArea>
      </_3ColumnWrapper>
      <FooterWrapper>
        <button
          onClick={async () => {
            try {
              const customRequest = customRequestFactory(prompt, files);
              const customRequestResponse = await customRequest;
              console.log("customRequestResponse", customRequestResponse);

              const detectedLng = navigatorLangDetector();
              router.push(`/${detectedLng}/dashboard/queue`);
              infoToast(t("toast-messages:custom-request-is-processing"));
            } catch (e: any) {
              errorToast(e.toString());
            }
          }}
          disabled={files.length === 0 || prompt === ""}
          className={`${
            files.length === 0 || prompt === "" ? "opacity-50" : "opacity-100"
          } mt-2 flex justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          {t("dashboard-page:custom-request-v2.send")!}
        </button>
      </FooterWrapper>
    </Layout3ColumnAndFooterWrapper>
  );
}
