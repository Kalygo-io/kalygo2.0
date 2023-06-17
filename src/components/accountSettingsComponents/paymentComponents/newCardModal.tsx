import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { addStripeCard } from "@/services/addStripeCard";
import { useTranslation } from "next-i18next";

import { useForm } from "react-hook-form";
import { errorReporter } from "@/utility/error/reporter";

interface P {
  open: boolean;
  cb: (isOpen: boolean, newCard: any) => void;
}

export function NewCardModal(p: P) {
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
      cardNumber: "", // 4242424242424242
      expDate: "", // 11/24
      cvc: "", // 123
    },
  });

  const { open, cb } = p;

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);

      const [expMonth, expYear] = data.expDate;

      await addStripeCard(
        {
          exp_month: expMonth,
          exp_year: expYear,
          cvc: data.cvc,
          card_number: data.cardNumber,
        },
        (newCard: any) => {
          cb(false, newCard);
        }
      );
    } catch (e) {
      errorReporter(e);
    }
  };

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <LockClosedIcon
                      className="h-6 w-6 text-gray-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {t(
                        "dashboard-page:settings.payment.new-card-modal.card-details"
                      )}
                    </Dialog.Title>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-wrap gap-3 w-full p-5"
                >
                  <label className="relative w-full flex flex-col">
                    <span className="mb-3">
                      {t(
                        "dashboard-page:settings.payment.new-card-modal.card-number"
                      )}
                    </span>
                    <input
                      {...register("cardNumber", {
                        required: true,
                        pattern: new RegExp(/^[0-9]+$/),
                      })}
                      className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                      type="text"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </label>

                  <label className="relative flex-1 flex flex-col">
                    <span className="mb-3">
                      {t(
                        "dashboard-page:settings.payment.new-card-modal.expiration-date"
                      )}
                    </span>
                    <input
                      {...register("expDate", {
                        required: true,
                        pattern: new RegExp(/[0-9]{2}\/[0-9]{2}/),
                      })}
                      className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                      type="text"
                      name="expDate"
                      placeholder="MM/YY"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </label>

                  <label className="relative flex-1 flex flex-col">
                    <span className="flex items-center gap-3 mb-3">
                      {/* CVC/CVV */}
                      {t("dashboard-page:settings.payment.new-card-modal.cvv")}
                      <span className="relative group">
                        <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white">
                          {" "}
                          {t(
                            "dashboard-page:settings.payment.new-card-modal.security-code"
                          )}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    </span>
                    <input
                      {...register("cvc", {
                        required: true,
                        pattern: new RegExp(/^[0-9]+$/),
                      })}
                      className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                      type="text"
                      name="cvc"
                      placeholder="&bull;&bull;&bull;"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </label>
                </form>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    disabled={!isValid}
                    onClick={() => onSubmit(getValues())}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => cb(false, null)}
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
