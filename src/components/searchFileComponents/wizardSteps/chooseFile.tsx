import { XCircleIcon, DocumentIcon } from "@heroicons/react/24/outline";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "next-i18next";
import { Layout3ColumnAndFooterWrapper } from "../sharedComponents/layout3ColumnAndFooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { LeftAreaAndMainWrapper } from "../sharedComponents/leftAreaAndMainWrapper";
import { LeftArea } from "../sharedComponents/leftArea";
import { MainArea } from "../sharedComponents/mainArea";
import { RightArea } from "../sharedComponents/rightArea";

interface Props {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export function ChooseFile(props: Props) {
  const { file, setFile, setStep } = props;
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [fileLocal, setFileLocal] = useState<File | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFileLocal(file);
  }, []);

  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();

    if (
      (e.type === "dragenter" || e.type === "dragover") &&
      ["application/pdf", "text/plain"].includes(
        e.dataTransfer?.items["0"]?.type
      )
    ) {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      ["application/pdf", "text/plain"].includes(
        e.dataTransfer?.items["0"]?.type
      )
    ) {
      setFile(e.dataTransfer.files[0]);
      setStep(2);
    }
  };

  const handleChange = async function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStep(2);
    }
  };

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
                    className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
                      dragActive ? "drag-active" : ""
                    }`}
                  >
                    <div>
                      <DocumentIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />

                      <div className="mb-2 mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
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
                            {t("dashboard-page:perform-vector-search.select")}
                            <input
                              ref={inputRef}
                              type="file"
                              id="input-file-upload"
                              multiple={true}
                              onChange={handleChange}
                              accept=".pdf,.txt"
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
                        {t("dashboard-page:summarize.upload-limits")}
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
            {fileLocal && (
              <li className="flex items-center justify-between gap-x-6 py-5">
                <div className="flex items-start gap-x-2">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {fileLocal.name}
                  </p>
                  <XCircleIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => {
                      setFileLocal(null);
                    }}
                  />
                </div>
              </li>
            )}
          </ul>
        </RightArea>
      </_3ColumnWrapper>
      <></>
    </Layout3ColumnAndFooterWrapper>
  );
}
