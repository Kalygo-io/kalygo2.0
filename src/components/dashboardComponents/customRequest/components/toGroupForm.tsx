import { addCustomRequestToAccessGroupFactory } from "@/serviceFactory/addCustomRequestToAccessGroupFactory";
import { removeCustomRequestFromAccessGroupFactory } from "@/serviceFactory/removeCustomRequestFromAccessGroupFactory";
import { errorReporter } from "@/utility/error/reporter";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";

interface P {
  cb: (isOpen: boolean) => void;
  accessGroups: any[];
  customRequest: any;
}

export const ToGroupForm = (p: P) => {
  const { cb, accessGroups, customRequest } = p;
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
      shareToGroup: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);

      const request = addCustomRequestToAccessGroupFactory(
        customRequest.id,
        Number.parseInt(data.shareToGroup)
      );

      const response = await request;
      cb(false);
    } catch (e) {
      errorReporter(e);
    }
  };

  console.log("accessGroups", accessGroups);
  console.log("customRequest", customRequest);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap w-full">
        <div className="py-4">
          {customRequest.CustomRequestsAndAccessGroups?.length > 0 && (
            <b>Shared with:</b>
          )}{" "}
          {customRequest.CustomRequestsAndAccessGroups?.map((i: any) => (
            <span
              key={i.accessGroup.id}
              className="inline-flex items-start gap-x-1 truncate"
            >
              {i.accessGroup.name}{" "}
              <XCircleIcon
                className="h-6 w-6 cursor-pointer"
                onClick={async () => {
                  console.log("___ --- ___");
                  const request = removeCustomRequestFromAccessGroupFactory(
                    customRequest.id,
                    Number.parseInt(i.accessGroup.id)
                  );
                  const response = await request;
                  cb(true);
                }}
              />
            </span>
          ))}
        </div>
        <fieldset className="relative w-full flex flex-col max-w-lg">
          <div className="space-x-2 flex justify-between">
            <select
              {...register("shareToGroup")}
              id="shareToGroup"
              name="shareToGroup"
              autoComplete="shareToGroup"
              className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value={""} className="text-gray-400">
                Select Access Group
              </option>
              {accessGroups.map((ag) => {
                return (
                  <option key={ag?.name} value={ag?.id}>
                    {ag?.name}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
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
