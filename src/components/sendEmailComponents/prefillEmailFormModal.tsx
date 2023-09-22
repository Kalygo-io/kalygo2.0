import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  Cog6ToothIcon,
  LockClosedIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { addStripeCard } from "@/services/addStripeCard";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { errorReporter } from "@/utility/error/reporter";
import React from "react";
// import { ToIndividualForm } from "./toIndividualForm";
// import { ToGroupForm } from "./toGroupForm";

interface P {
  open: boolean;
  cb: (json: Record<string, any> | null, isOpen: boolean) => void;
}

export const ShareModal = (p: P) => {
  const { open, cb } = p;
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
      json: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);

      const asJson = JSON.parse(data.json);
      cb(asJson, false);
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => cb(null, false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 border border-black">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Cog6ToothIcon
                      className="h-6 w-6 text-gray-600"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap gap-3 w-full">
                    <fieldset className="relative w-full flex flex-col">
                      <textarea
                        {...register("json", {
                          required: true,
                        })}
                        name="json"
                        placeholder="JSON"
                        className={`mt-3 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                          errors["json"] && "ring-red-700 focus:ring-red-500"
                        }`}
                      />
                    </fieldset>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      disabled={!isValid}
                      onClick={() => onSubmit(getValues())}
                      type="submit"
                      className={`${!isValid ? "opacity-50" : "opacity-100"}
    inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2`}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => cb(null, false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
