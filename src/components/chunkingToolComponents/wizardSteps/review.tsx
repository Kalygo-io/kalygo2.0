import React, { RefObject, useState } from "react";
import { useTranslation } from "next-i18next";
import { errorToast } from "@/utility/toasts";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { RightArea } from "../sharedComponents/rightArea";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { Tiktoken, encoding_for_model } from "@dqbd/tiktoken";
import { areChunksValidForModelContext } from "../utils/areChunksValidForModelContext";
import model_pricing from "@/config/model_pricing";
import { makeChunksSmaller } from "../utils/makeChunksSmaller";
import { convertFileToTxtFile } from "../utils/convertFileToTxtFile";
import { classNames } from "@/utility/misc/classNames";
import { saveAs } from "file-saver";

interface Props {
  customizations: {
    mode: string;
    model: "gpt-3.5-turbo" | "gpt-4";
    prompt?: string;
    finalPrompt?: string;
    overallPrompt?: string;
    includeFinalPrompt?: boolean;
  } | null;
  files: File[];
  wizardStepsRef: RefObject<HTMLElement>;
}

export function Review(props: Props) {
  const { customizations, files, wizardStepsRef } = props;

  const router = useRouter();
  const { t } = useTranslation();

  const [chunks, setChunks] = useState<string[]>();

  const {
    formState: { errors },
  } = useForm({});

  const encoder: Tiktoken | null = customizations?.model
    ? encoding_for_model(customizations?.model)
    : null;

  return (
    <>
      <Layout3ColumnAndFooterWrapper>
        <_3ColumnWrapper>
          <LeftAreaAndMainWrapper>
            <LeftArea>
              <h2 className="text-lg font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                {t("dashboard-page:chunking-tool.chosen-file")!}
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
                  No file selected
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
                      <div className="text-center">
                        {customizations?.model && (
                          <span>{customizations?.model}</span>
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
              Click &apos;Chunk&apos; to break up your file into chunks
            </p>
          </RightArea>
        </_3ColumnWrapper>
        <FooterWrapper>
          <button
            onClick={async () => {
              try {
                console.log("generating chunks...");
                const fileAsTxt: string = await convertFileToTxtFile(files[0]);
                let chunks: string[] = [fileAsTxt];
                while (
                  !areChunksValidForModelContext(
                    [chunks[0]], // check if the file is small enough to be prepended with the PROMPT_PREFIX and not trigger input token limit
                    model_pricing.models[customizations?.model!].context,
                    encoder!
                  )
                ) {
                  // -v-v- PROMPT_PREFIX PLUS THE_FILE IS TOO BIG SO MUST BREAK INTO SMALLER CHUNKS -v-v-
                  console.log("in while loop..."); // for console debugging...
                  let newChunks = makeChunksSmaller(
                    chunks,
                    model_pricing.models[customizations?.model!].context,
                    encoder!
                  );
                  chunks = newChunks;
                }
                console.log("chunks", chunks);
                setChunks(chunks);
              } catch (e: any) {
                errorToast(e.toString());
              }
            }}
            disabled={
              files.length === 0 ||
              !["gpt-3.5-turbo", "gpt-4"].includes(customizations?.model!)
            }
            className={`${
              files.length === 0 ||
              !["gpt-3.5-turbo", "gpt-4"].includes(customizations?.model!)
                ? "opacity-50"
                : "opacity-100"
            } mt-2 flex justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
          >
            {t("dashboard-page:chunking-tool.chunk")!}
          </button>
        </FooterWrapper>
      </Layout3ColumnAndFooterWrapper>

      {chunks?.length! > 0 && (
        <div>
          <button
            onClick={() => {
              for (let i = 0; i < chunks?.length!; i++) {
                if (chunks) {
                  const blob = new Blob([chunks[i]]);
                  saveAs(blob, `chunk${i + 1}`);
                }
              }
            }}
            className="text-blue-600 text-md cursor-pointer hover:text-blue-500 p-4"
          >
            <span>Download all chunks</span>
          </button>
          <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto p-2 bg-slate-100 rounded-lg">
            {chunks?.map((val, idx) => {
              return (
                <div
                  key={idx}
                  className={classNames(
                    "border-gray-300",
                    "ring-2 ring-blue-500",
                    "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                  )}
                >
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">
                        Chunk {idx + 1}
                      </span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">
                        Token length: {encoder?.encode(val).length}
                      </span>
                      <span
                        onClick={() => {
                          const blob = new Blob([val]);
                          saveAs(blob, `chunk${idx + 1}`);
                        }}
                        className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Download
                      </span>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
