import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  LockClosedIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { addStripeCard } from "@/services/addStripeCard";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { errorReporter } from "@/utility/error/reporter";
import React from "react";
import { ToIndividualForm } from "./toIndividualForm";
import { ToGroupForm } from "./toGroupForm";

interface P {
  open: boolean;
  cb: (isOpen: boolean, newCard: any) => void;
}

export const ShareModal = (p: P) => {
  const { open, cb } = p;

  const { t } = useTranslation();

  const [panel, setPanel] = useState<"individual" | "group">("individual");

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

  console.log("shareModal", errors);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => cb(false, null)}
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
                    <ShareIcon
                      className="h-6 w-6 text-gray-600"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <span className="isolate inline-flex rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setPanel("individual");
                      }}
                      className={`${
                        panel === "individual" ? "bg-blue-600" : "bg-white"
                      } ${
                        panel === "individual" ? "text-white" : "text-gray-900"
                      } ${
                        panel === "individual"
                          ? "hover:bg-blue-500"
                          : "hover:bg-gray-50"
                      } px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 relative inline-flex items-center rounded-l-md `}
                    >
                      to Individual
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPanel("group");
                      }}
                      className={`${
                        panel === "group" ? "bg-blue-600" : "bg-white"
                      } ${panel === "group" ? "text-white" : "text-gray-900"} ${
                        panel === "group"
                          ? "hover:bg-blue-500"
                          : "hover:bg-gray-50"
                      } px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 relative -ml-px inline-flex items-center rounded-r-md`}
                    >
                      to Group
                    </button>
                  </span>
                </div>

                {panel == "individual" ? (
                  <ToIndividualForm
                    cb={() => {
                      console.log("--- _ Individual _ ---");
                    }}
                  />
                ) : (
                  <ToGroupForm
                    cb={() => {
                      console.log("--- _ Group _ ---");
                    }}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
