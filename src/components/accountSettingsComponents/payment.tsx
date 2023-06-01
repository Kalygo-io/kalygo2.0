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
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { NewCardModal } from "./paymentComponents/newCardModal";
import { getStripeCards } from "@/services/getStripeCards";
import { deleteStripeCard } from "@/services/deleteStripeCard";
import { SectionLoader } from "../shared/SectionLoader";

interface P {
  // account: { email: string; firstName: string; lastName: string };
}

export function Payment(p: P) {
  const { t } = useTranslation();

  const [cards, setCards] = useState<{
    val: any[];
    loading: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    err: null,
  });

  const [newCardOpen, setNewCardOpen] = useState<boolean>(false);

  useEffect(() => {
    setCards({
      val: [],
      loading: true,
      err: null,
    });

    getStripeCards((payload: any, err: any) => {
      if (err) {
        setCards({
          val: [],
          loading: false,
          err: err,
        });
      } else {
        setCards({
          val: payload,
          loading: false,
          err: null,
        });
      }
    });
  }, []);

  let jsx = null;
  if (cards.loading) {
    jsx = <div className="text-center">...</div>;
  } else if (cards.err) {
    jsx = (
      <>
        <>
          <div className="text-center">
            <CreditCardIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              {t("dashboard-page:settings.payment.no-card")}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {t("dashboard-page:settings.payment.get-started")}
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
                {t("dashboard-page:settings.payment.new-card")}
              </button>
            </div>
          </div>
        </>
      </>
    );
  } else if (cards.val) {
    jsx = (
      <div>
        {cards.val?.length > 0 ? (
          <>
            <ul
              role="list"
              className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
            >
              {cards.val?.map((i: any, idx) => {
                return (
                  <li key={idx} className="flex justify-between gap-x-6 py-6">
                    <div className="font-medium text-gray-900">
                      **** **** **** {i.last4}
                    </div>
                    <button
                      type="button"
                      className="font-semibold text-red-600 hover:text-red-500"
                      onClick={() => {
                        deleteStripeCard(i.id, (val: any, err: any) => {
                          if (err) {
                          } else {
                            setCards({
                              val: cards.val?.filter(
                                (_: any, i: number) => i !== idx
                              ),
                              loading: false,
                              err: null,
                            });
                          }
                        });
                      }}
                    >
                      {t("dashboard-page:settings.payment.delete-card")}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <div className="text-center">
              <CreditCardIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                {t("dashboard-page:settings.payment.no-card")}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {t("dashboard-page:settings.payment.get-started")}
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
                  {t("dashboard-page:settings.payment.new-card")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  } else {
  }

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            {t("dashboard-page:settings.personal.title")}
          </h2>
        </div>
        {jsx}
      </div>

      <NewCardModal
        open={newCardOpen}
        cb={(isOpen: boolean, newCard: object) => {
          newCard &&
            setCards({
              val: [...cards.val, newCard],
              loading: false,
              err: null,
            });
          setNewCardOpen(isOpen);
        }}
      />
    </>
  );
}
