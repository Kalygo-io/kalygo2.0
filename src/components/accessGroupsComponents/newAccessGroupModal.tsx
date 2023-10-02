import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  LockClosedIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { addStripeCard } from "@/services/addStripeCard";
import { useTranslation } from "next-i18next";

import { useForm } from "react-hook-form";
import { errorReporter } from "@/utility/error/reporter";
import { newAccessGroupFactory } from "@/serviceFactory/newAccessGroup";

interface P {
  open: boolean;
  cb: (isOpen: boolean) => void;
}

export function NewAccessGroupModal(p: P) {
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
      name: "",
    },
  });

  const { open, cb } = p;

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);

      const request = newAccessGroupFactory(data.name);
      const response = await request;

      cb(false);
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => cb(false)}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <UserGroupIcon
                      className="h-6 w-6 text-gray-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {t("dashboard-page:access-groups.new-access-group")}
                    </Dialog.Title>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-wrap gap-3 w-full p-5"
                >
                  <label className="relative w-full flex flex-col">
                    <span className="mb-3">
                      {t("dashboard-page:access-groups.name")}
                    </span>
                    <input
                      {...register("name", {
                        required: true,
                      })}
                      className="rounded-md pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                      type="text"
                      name="name"
                      placeholder="Matter name"
                    />
                  </label>
                </form>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    disabled={!isValid}
                    onClick={() => onSubmit(getValues())}
                    type="button"
                    className={`${
                      isValid ? "opacity-100" : "opacity-50"
                    } inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2`}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => cb(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
