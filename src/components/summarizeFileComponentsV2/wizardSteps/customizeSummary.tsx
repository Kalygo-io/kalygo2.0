import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

interface Props {
  files: File[];
  customizations: Record<string, string> | null;
  setStep: Dispatch<SetStateAction<number>>;
  setCustomizations: Dispatch<SetStateAction<Record<string, string> | null>>;
  wizardStepsRef: RefObject<HTMLElement>;
  setShowPaymentMethodRequiredModal: (showModal: boolean) => void;
}

export function CustomizeSummary(props: Props) {
  const {
    customizations,
    setStep,
    setCustomizations,
    setShowPaymentMethodRequiredModal,
  } = props;
  const { t } = useTranslation();

  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    customizations;
  }, []);

  const onSubmit = async (data: any) => {
    try {
      console.log("provideRequest submit", data);
      setCustomizations(data);
      setStep(3);
    } catch (e: any) {}
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      format: customizations?.format || "bullet-points",
      type: customizations?.type || "summarize-chunks",
      length: customizations?.length || "short",
      language: customizations?.language || "English",
    },
  });

  return (
    <div className="flex min-h-full flex-col px-4 py-6 sm:px-6 lg:py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 sm:space-y-16">
          <div>
            <div className="mt-4 sm:mt-0 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:pb-0">
              <fieldset>
                <legend className="sr-only">Format</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <div
                    className="text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    Format
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      {/* <p className="text-sm leading-6 text-gray-600">
                        These are delivered via SMS to your mobile phone.
                      </p> */}
                      <div className="mt-6 space-x-2 flex justify-between">
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("format")}
                            id="bullet-points"
                            name="format"
                            type="radio"
                            value="bullet-points"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="bullet-points"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Bullet points
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("format")}
                            id="paragraph"
                            name="format"
                            type="radio"
                            value="paragraph"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="paragraph"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Paragraph
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">Type</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <div
                    className="text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    Type
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      {/* <p className="text-sm leading-6 text-gray-600">
                        These are delivered via SMS to your mobile phone.
                      </p> */}
                      <div className="mt-6 space-x-2 flex justify-between">
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("type")}
                            id="each-part-of-data"
                            name="type"
                            type="radio"
                            value="summarize-chunks"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="each-part-of-data"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Summarize Chunks
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("type")}
                            id="overall-data"
                            name="type"
                            type="radio"
                            value="summarize-overall"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="overall-data"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Summarize Overall
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">Length</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <div
                    className="text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    Length
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      {/* <p className="text-sm leading-6 text-gray-600">
                        These are delivered via SMS to your mobile phone.
                      </p> */}
                      <div className="mt-6 space-x-2 flex justify-between">
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("length")}
                            id="short"
                            name="length"
                            type="radio"
                            value="short"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="short"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Short
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("length")}
                            id="medium"
                            name="length"
                            type="radio"
                            value="medium"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="medium"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Medium
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            {...register("length")}
                            id="long"
                            name="length"
                            type="radio"
                            value="long"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label
                            htmlFor="long"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Long
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">Language</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Language
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      <div className="mt-6 space-x-2 flex justify-between">
                        {/* <div className="mt-2 sm:col-span-2 sm:mt-0"> */}
                        <select
                          {...register("language")}
                          id="language"
                          name="language"
                          autoComplete="language"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>Portuguese</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}