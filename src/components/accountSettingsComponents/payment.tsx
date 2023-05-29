import { navigatorLangDetector } from "@/lib/languageDetector";
import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts";
import {
  PlusIcon,
  UserCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { NewCardModal } from "./paymentComponents/newCardModal";

interface P {
  // account: { email: string; firstName: string; lastName: string };
}

export function Payment(p: P) {
  const { t } = useTranslation();

  //   const {
  //     account: { email, firstName, lastName },
  //   } = p;

  //   const onSubmit = async (data: any) => {
  //     try {
  //       const { email, firstName, lastName } = data;
  //       console.log("data", data);

  //       var config = {
  //         method: "patch",
  //         url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account`,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         data: {
  //           email,
  //           firstName,
  //           lastName,
  //         },
  //         withCredentials: true,
  //       };

  //       let resp = await axios(config);

  //       console.log("resp", resp);
  //     } catch (e) {
  //       errorReporter(e);
  //     }
  //   };

  const [newCardOpen, setNewCardOpen] = useState<boolean>(false);

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Payment
          </h2>
        </div>
        {false ? (
          <div className="space-y-16">
            <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
              <img
                className="relative object-cover w-full h-full rounded-xl"
                src="https://i.imgur.com/kGkSg1v.png"
              />

              <div className="w-full px-8 absolute top-8">
                <div className="flex justify-between">
                  <div>
                    <p className="font-light">Name</p>
                    <p className="font-medium tracking-widest">Karthik P</p>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="font-light">Card Number</p>
                  <p className="font-medium tracking-more-wider">
                    4642 3489 9867 7632
                  </p>
                </div>
                <div className="pt-6 pr-6">
                  <div className="flex justify-between">
                    <div className="">
                      <p className="font-light text-xs">Valid</p>
                      <p className="font-medium tracking-wider text-sm">
                        11/15
                      </p>
                    </div>
                    <div className="">
                      <p className="font-light text-xs">Expiry</p>
                      <p className="font-medium tracking-wider text-sm">
                        03/25
                      </p>
                    </div>

                    <div className="">
                      <p className="font-light text-xs">CVV</p>
                      <p className="font-bold tracking-more-wider text-sm">
                        ···
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <CreditCardIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No Card
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by saving your card with Stripe
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  onClick={() => {
                    setNewCardOpen(true);
                  }}
                >
                  <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  New Card
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <NewCardModal
        open={newCardOpen}
        setOpen={(isOpen: boolean) => setNewCardOpen(isOpen)}
      />
    </>
  );
}
