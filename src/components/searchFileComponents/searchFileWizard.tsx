import React, { useRef, useState } from "react";

import { CheckIcon } from "@heroicons/react/24/solid";
import { ChooseFile } from "./wizardSteps/chooseFile";
import { Query } from "./wizardSteps/query";
import { infoToast } from "@/utility/toasts";
import { WindowLoader } from "../shared/WindowLoader";
import { Error } from "../shared/error";
import { ErrorInDashboard } from "../shared/errorInDashboard";

const steps = [
  { id: 1, name: "Choose file", href: "#", status: "current" },
  { id: 2, name: "Search", href: "#", status: "upcoming" },
];

interface Props {
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function SearchFileWizard(props: Props) {
  const { setShowPaymentMethodRequiredModal } = props;
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const wizardStepsRef = useRef(null);

  let jsx = null;
  switch (step) {
    case 1:
      jsx = (
        <ChooseFile
          setShowPaymentMethodRequiredModal={setShowPaymentMethodRequiredModal}
          file={file}
          setFile={setFile}
          setStep={setStep}
        />
      );
      break;
    case 2:
      jsx = <Query file={file} wizardStepsRef={wizardStepsRef} />;
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
