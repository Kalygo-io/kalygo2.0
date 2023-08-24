import { errorReporter } from "@/utility/error/reporter";
import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";

interface P {
  cb: (isOpen: boolean) => void;
}

export const ToIndividualForm = (p: P) => {
  const { cb } = p;
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
      shareToEmail: "", // example@example.com
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
      <div className="flex flex-wrap gap-3 w-full">
        <label className="relative w-full flex flex-col">
          <span className="mb-3">
            {t("dashboard-page:summary-v2.share-modal.email")}
          </span>
          <input
            {...register("shareToEmail", {
              required: true,
              pattern: new RegExp(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/ // email RegExp
              ),
            })}
            type="text"
            name="shareToEmail"
            placeholder="Email"
            className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
              errors["shareToEmail"] && "ring-red-700 focus:ring-red-500"
            }`}
          />
        </label>
      </div>
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
