import { uploadFile } from "@/services/uploadFile";
import {
  XCircleIcon,
  PhotoIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import get from "lodash.get";

import { useTranslation } from "next-i18next";

import { infoToast } from "@/utility/toasts";
import { getSummarizationQuote } from "@/services/getSummarizationQuote";
import { useForm, Controller } from "react-hook-form";
import { similaritySearchInFile } from "@/services/similaritySearchInFile";

interface Props {
  onSuccess: ({
    results,
    query,
  }: // fileName,
  // originalLength,
  // condensedLength,
  {
    results: string[];
    query: string;
    // fileName: string;
    // originalLength: number;
    // condensedLength: number;
  }) => void;
  setSearchResultsState: (state: any) => void;
  onError: (err: any) => void;
}

export function SearchFileForm(props: Props) {
  const { onSuccess, onError, setSearchResultsState } = props;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({});

  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>();

  const { t } = useTranslation();

  // handle drag events
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

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);

    console.log("data.file", data.file[0]);

    setSearchResultsState({
      val: null,
      loading: true,
      err: null,
    });

    similaritySearchInFile(
      data.query,
      data.file,
      (results: string[], err: any) => {
        if (err) {
          onError(err);
        } else {
          onSuccess({
            results,
            query: data.query,
          });
        }

        // setQuoteForFile({ quote, filePath });
        // infoToast(`${t("dashboard-page:summarize.received-quote")} ($${quote})`);
      }
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute  flex items-start pl-3 pt-4 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <textarea
                  {...register("query", { required: "Query is required" })}
                  rows={1}
                  id="query"
                  className={`block w-full rounded-md border-0 p-4 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors["query"] && "ring-red-700 focus:ring-red-500"
                  }`}
                  placeholder="Similarity search..."
                />
              </div>
            </div> */}

            <div>
              <textarea
                {...register("query", { required: true })}
                rows={3}
                id="query"
                placeholder="Perform a similarity search..."
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                  errors["query"] && "ring-red-700 focus:ring-red-500"
                }`}
              />
            </div>
            <div className="col-span-full">
              <div className="mt-2 flex items-center gap-x-3">
                <input
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900"
                  {...register("file", {
                    required: true,
                  })}
                  multiple
                  accept=".pdf,.txt"
                  type="file"
                  id="file"
                />
              </div>
            </div>
            {/* <input>
              <textarea
                {...register("description", {
                  maxLength: {
                    value: 100,
                    message: "Description cannot be longer than 100 characters",
                  },
                })}
                id="description"
                rows={10}
              />
            </input> */}
            {/* <div>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={0}
                  render={({ field: { ref, ...field } }) => (
                    <NumberInput {...field} id="amount" />
                  )}
                  rules={{
                    max: {
                      value: 10,
                      message: "Maximum number of servings is 10",
                    },
                  }}
                />
              </div> */}

            {/*Alternative approach using controlled component*/}
            {/*<Field label="Picture" error={errors.picture}>*/}
            {/*  <Controller*/}
            {/*    control={control}*/}
            {/*    name={"picture"}*/}
            {/*    rules={{ required: "Recipe picture is required" }}*/}
            {/*    render={({ field: { value, onChange, ...field } }) => {*/}
            {/*      return (*/}
            {/*        <Input*/}
            {/*          {...field}*/}
            {/*          value={value?.fileName}*/}
            {/*          onChange={(event) => {*/}
            {/*            onChange(event.target.files[0]);*/}
            {/*          }}*/}
            {/*          type="file"*/}
            {/*          id="picture"*/}
            {/*        />*/}
            {/*      );*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</Field>*/}

            <div>
              <button className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 m-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
