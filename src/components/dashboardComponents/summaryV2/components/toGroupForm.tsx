import { errorReporter } from "@/utility/error/reporter";
import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";

interface P {
  cb: (isOpen: boolean) => void;
  accessGroups: any[];
}

export const ToGroupForm = (p: P) => {
  const { cb, accessGroups } = p;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      shareToGroup: "Public",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend className="sr-only">Access Groups</legend>
        <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
          <label
            htmlFor="accessGroups"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            Access Groups
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <div className="max-w-lg">
              <div className="mt-6 space-x-2 flex justify-between">
                <select
                  {...register("shareToGroup")}
                  id="accessGroups"
                  name="accessGroups"
                  autoComplete="accessGroups"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {accessGroups.map((g) => {
                    return <option key={g.name}>{g.name}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          disabled={!isValid}
          // onClick={() => onSubmit(getValues())}
          type="submit"
          className={`${!isValid ? "opacity-50" : "opacity-100"}
    inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2`}
        >
          Share
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          onClick={() => cb(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
