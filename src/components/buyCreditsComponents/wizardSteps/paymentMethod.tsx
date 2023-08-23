import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { FooterWrapper } from "../sharedComponents/FooterWrapper";
import { _3ColumnWrapper } from "../sharedComponents/3ColumnWrapper";
import { SummaryMode } from "@/types/SummaryMode";
import {
  LockClosedIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { FaCcStripe } from "react-icons/fa6";

interface Props {
  account: any;
  creditsAmount: {
    credits: number;
    selectedCreditAmountPreset: {
      id: number;
      title: string;
      price: string;
    };
  } | null;
  paymentMethod: {
    card_number: string;
    name: string;
    exp_date: string;
    cvc: string;
    saveCard: boolean;
  } | null;
  setStep: Dispatch<SetStateAction<number>>;
  setPaymentMethod: Dispatch<
    SetStateAction<{
      card_number: string;
      name: string;
      exp_date: string;
      cvc: string;
      saveCard: boolean;
    } | null>
  >;
  wizardStepsRef: RefObject<HTMLElement>;
}

export function PaymentMethod(props: Props) {
  const { creditsAmount, paymentMethod, setStep, setPaymentMethod, account } =
    props;
  const { t } = useTranslation();

  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: any) => {
    try {
      console.log("provideRequest submit", data);
      setPaymentMethod(data);
      setStep(3);
    } catch (e: any) {}
  };

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      card_number: "",
      name: "",
      exp_date: "",
      cvc: "",
      saveCard: true,
    },
  });

  useEffect(() => {
    if (paymentMethod) {
      setValue("card_number", paymentMethod?.card_number);
      setValue("name", paymentMethod?.name);
      setValue("exp_date", paymentMethod?.exp_date);
      setValue("cvc", paymentMethod?.cvc);
      trigger();
    }
  }, []);

  return (
    <div className="flex min-h-full flex-col">
      <_3ColumnWrapper>
        <div className="mx-auto w-full max-w-lg">
          <div className="mt-10 lg:mt-0">
            <h2 className="text-md px-6 pt-8 font-medium text-gray-900 text-center">
              *Don&apos;t worry, you won&apos;t be charged yet
            </h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-6 sm:px-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <LockClosedIcon
                  className="h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              </div>
              <form className="mx-auto max-w-xl">
                <div className="m-0 p-0">
                  <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                    <div className="col-span-4">
                      <label
                        htmlFor="card_number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card number{" "}
                        <span>
                          <FaCcStripe
                            className="text-indigo-600 inline h-6 w-6"
                            aria-label="Stripe Icon"
                          />
                        </span>
                      </label>
                      <div className="mt-1">
                        <input
                          {...register("card_number", {
                            required: true,
                            pattern: new RegExp(/^[0-9]+$/),
                          })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          type="text"
                          name="card_number"
                          autoComplete="card_number"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name on card
                      </label>
                      <div className="mt-1">
                        <input
                          {...register("name", {
                            required: true,
                          })}
                          type="text"
                          name="name"
                          autoComplete="name"
                          placeholder="Cardholder's name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="exp_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <input
                          {...register("exp_date", {
                            required: true,
                            pattern: new RegExp(/[0-9]{2}\/[0-9]{2}/),
                          })}
                          placeholder="MM/YY"
                          type="text"
                          name="exp_date"
                          id="exp_date"
                          autoComplete="exp_date"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <div className="mt-1">
                        <input
                          {...register("cvc", {
                            required: true,
                            pattern: new RegExp(/^[0-9]+$/),
                          })}
                          placeholder="&bull;&bull;&bull;"
                          type="text"
                          name="cvc"
                          id="cvc"
                          autoComplete="csc"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mt-1">
                        <label
                          htmlFor="saveCard"
                          className="text-sm font-medium text-gray-700"
                        >
                          Save Card
                        </label>
                        <input
                          {...register("saveCard")}
                          type="checkbox"
                          name="saveCard"
                          id="saveCard"
                          autoComplete="saveCard"
                          className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </_3ColumnWrapper>
      <FooterWrapper>
        <div className="flex items-center justify-end gap-x-6">
          <button
            disabled={!isValid}
            onClick={() => {
              onSubmit(getValues());
            }}
            className={`inline-flex ${
              !isValid ? "opacity-50" : "opacity-100"
            } justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
          >
            Next
          </button>
        </div>
      </FooterWrapper>
    </div>
  );
}
