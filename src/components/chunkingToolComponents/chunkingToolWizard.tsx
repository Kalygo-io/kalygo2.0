import React, { useRef, useState } from "react";
import { ChooseFile } from "./wizardSteps/chooseFile";
import { CustomizeRequest } from "./wizardSteps/customizeRequest";
import { Review } from "./wizardSteps/review";
import { ErrorInDashboard } from "../shared/errorInDashboard";
import { useTranslation } from "next-i18next";
import { CheckIcon } from "@heroicons/react/24/outline";
import { SupportedOpenAiModels } from "@/types/SupportedOpenAiModels";

interface Props {
  account: any;
}

export function ChunkingToolWizard(props: Props) {
  const { account } = props;

  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[] | null>(null);
  const [customizations, setCustomizations] = useState<{
    mode: string;
    model: SupportedOpenAiModels;
    prompt?: string;
    finalPrompt?: string;
    overallPrompt?: string;
    includeFinalPrompt?: boolean;
  } | null>(null);

  const { t } = useTranslation();

  const wizardStepsRef = useRef(null);

  const steps = [
    { id: 1, name: t("dashboard-page:chunking-tool.choose-file") },
    { id: 2, name: t("dashboard-page:chunking-tool.provide-details") },
    { id: 3, name: t("dashboard-page:chunking-tool.chunk") },
  ];

  let jsx = null;
  switch (step) {
    case 1:
      jsx = <ChooseFile files={files} setFiles={setFiles} setStep={setStep} />;
      break;
    case 2:
      jsx = (
        <CustomizeRequest
          account={account}
          customizations={customizations}
          files={files || []}
          setCustomizations={setCustomizations}
          setStep={setStep}
          wizardStepsRef={wizardStepsRef}
        />
      );
      break;
    case 3:
      jsx = (
        <Review
          customizations={customizations}
          files={files || []}
          wizardStepsRef={wizardStepsRef}
        />
      );
      break;
    default:
      jsx = <ErrorInDashboard />;
  }

  return (
    <div className="p-2 sm:p-4 lg:p-4 px-2 sm:px-2 lg:px-2">
      <nav aria-label="Progress" ref={wizardStepsRef}>
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((s, sIdx) => (
            <li
              onClick={(evt) => {
                setStep(s.id);
              }}
              key={s.name}
              className="relative md:flex md:flex-1 cursor-pointer"
            >
              {s.id < step ? (
                <span className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800">
                      <CheckIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {s.name}
                    </span>
                  </span>
                </span>
              ) : s.id === step ? (
                <span
                  className="flex items-center px-6 py-4 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                    <span className="text-blue-600">{s.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-blue-600">
                    {s.name}
                  </span>
                </span>
              ) : (
                <span className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {s.id}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {s.name}
                    </span>
                  </span>
                </span>
              )}

              {sIdx !== steps.length - 1 ? (
                <>
                  <div
                    className="absolute right-0 top-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      {jsx}
    </div>
  );
}
