import { navigatorLangDetector } from "@/lib/languageDetector";
import { cancelSubscription } from "@/services/cancelSubscription";
import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

interface P {
  account: {
    email: string;
    firstName: string;
    lastName: string;
    subscriptionPlan: string;
    subscriptions: any[];
  };
  cb: () => void;
}

export function Plan(p: P) {
  const { t } = useTranslation();

  const {
    account: { email, firstName, lastName, subscriptionPlan, subscriptions },
    cb,
  } = p;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      plan: subscriptionPlan,
    },
  });

  useEffect(() => {
    console.log("--- !!! ---");
    setValue("plan", subscriptionPlan);
  }, [subscriptionPlan]);

  const onSubmit = async (data: any) => {
    try {
      const { plan } = data;

      console.log("onSubmit");

      var config = {
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/change-plan`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          firstName,
          lastName,
          subscriptionPlan: plan,
        },
        withCredentials: true,
      };

      let resp = await axios(config);

      cb();

      infoToast(t("toast-messages:successfully-changed-plan"));
    } catch (e) {
      setValue("plan", subscriptionPlan);

      errorReporter(e);
    }
  };

  // console.log("--- ___ ---");

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            {t("dashboard-page:settings.subscription.title")}
          </h2>
        </div>

        <div className="md:col-span-2">
          <h3>
            {t("dashboard-page:settings.subscription.you-are-currently-on")}{" "}
            {subscriptionPlan}
          </h3>
          <div className="pb-16">
            {get(subscriptions, "data", []).map((i: any, idx: number) => {
              const start_date = new Date(i.start_date).getTime() * 1000;

              if (i.canceled_at < Date.now() / 1000) {
                return (
                  <div
                    key={i.id}
                    className="pt-6 flex flex-col sm:flex-row items-center"
                  >
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      {new Date(start_date).toDateString()}
                    </dt>
                    <dd className="mt-1 flex justify-start gap-x-6 sm:mt-0 sm:flex-row">
                      <div className="text-gray-900">{i.status}</div>
                      <button
                        type="button"
                        className="font-semibold text-red-600 hover:text-red-500"
                        onClick={() => {
                          cancelSubscription(i.id, () => {
                            cb();
                            setValue("plan", "STANDARD");
                          });
                        }}
                      >
                        {t("dashboard-page:settings.subscription.cancel")}
                      </button>
                    </dd>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="plan"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  {t("dashboard-page:settings.subscription.switch-plan")}
                </label>
                <div className="mt-2">
                  <select
                    {...register("plan", { required: true })}
                    id="plan"
                    name="plan"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option key={"FREE"} value={"FREE"}>
                      Free
                    </option>
                    <option key={"STANDARD"} value={"STANDARD"}>
                      Standard
                    </option>
                    <option key={"PREMIUM"} value={"PREMIUM"}>
                      Premium
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                {t("dashboard-page:settings.subscription.change")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
