import React, { useRef, useState } from "react";

import { CheckIcon } from "@heroicons/react/24/solid";
import { ChooseFile } from "./wizardSteps/chooseFile";
import { Query } from "./wizardSteps/query";
import { infoToast } from "@/utility/toasts";
import { WindowLoader } from "../shared/WindowLoader";
import { Error } from "../shared/error";

const steps = [
  { id: 1, name: "Choose file", href: "#", status: "current" },
  { id: 2, name: "Query", href: "#", status: "upcoming" },
  //   { id: "03", name: "Results", href: "#", status: "upcoming" },
];

interface Props {
  // onSuccess: ({
  //   results,
  //   query,
  // }: // fileName,
  // // originalLength,
  // // condensedLength,
  // {
  //   results: string[];
  //   query: string;
  //   // fileName: string;
  //   // originalLength: number;
  //   // condensedLength: number;
  // }) => void;
  // setSearchResultsState: (state: any) => void;
  // onError: (err: any) => void;
}

export function SearchFileWizard(props: Props) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [searchResults, setSearchResultsState] = useState<{
    val: {
      results: string[];
      query: string;
    } | null;
    loading: boolean;
    err: Error | null;
  }>({
    val: null,
    loading: false,
    err: null,
  });

  const wizardStepsRef = useRef(null);

  let jsx = null;
  switch (step) {
    case 1:
      jsx = <ChooseFile file={file} setFile={setFile} setStep={setStep} />;
      break;
    case 2:
      jsx = (
        <Query
          file={file}
          wizardStepsRef={wizardStepsRef}
          onSuccess={(resp: { results: string[]; query: string }) => {
            infoToast("Successfully performed similarity search");

            console.log("RESULTS", resp);

            // setSearchResultsState({
            //   val: resp,
            //   loading: false,
            //   err: null,
            // });
          }}
          //   setSearchResultsState={setSearchResultsState}
          onError={(err) => {
            // setSearchResultsState({
            //   val: null,
            //   loading: false,
            //   err: err,
            // });
            // console.log("onError");
          }}
        />
      );
      break;
    default:
      jsx = <Error />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 px-2 sm:px-2 lg:px-2">
      <nav aria-label="Progress" ref={wizardStepsRef}>
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((s, sIdx) => (
            <li
              onClick={(evt) => {
                if (s.id === 1) {
                  setStep(s.id);
                }
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
