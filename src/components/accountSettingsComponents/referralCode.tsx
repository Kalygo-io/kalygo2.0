import { navigatorLangDetector } from "@/lib/languageDetector";
import { uploadAvatarFactory } from "@/serviceFactory/uploadAvatarFactory";
import { errorReporter } from "@/utility/error/reporter";
import { infoToast, successToast } from "@/utility/toasts";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import { useForm } from "react-hook-form";

interface P {
  id: string;
  account: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  refresh: any;
}

export function ReferralCode(p: P) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const [referralLink, setReferralLink] = useState<string>("");

  const {
    account: { email, id },
    account,
    refresh,
    id: divId,
  } = p;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const { code } = data;

      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/referral/create-code`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          code,
        },
        withCredentials: true,
      };

      let resp = await axios(config);

      setReferralLink(`${process.env.NEXT_PUBLIC_HOSTNAME}/signup/${code}`);

      successToast(t("toast-messages:create-referral-code-success"));
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <>
      <div
        id={divId}
        className="grid max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            {t("dashboard-page:settings.referral-code.title")}
          </h2>
          <button
            onClick={() => {
              router.push(`/dashboard/settings/referral-codes`);
            }}
            className="mt-1 p-0.5 text-sm leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            {t(
              "dashboard-page:settings.referral-code.view-your-referral-codes"
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="code"
                className="block text-sm font-medium leading-6 text-black"
              >
                {t("dashboard-page:settings.referral-code.code")}
              </label>
              <div className="mt-2">
                <input
                  {...register("code", {
                    required: true,
                  })}
                  placeholder={t("forms:enter-desired-referral-code")!}
                  id="code"
                  name="code"
                  type="code"
                  //   className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  className={`bg-white block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors["code"] && "ring-red-700 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {t("dashboard-page:settings.referral-code.generate")}
            </button>
          </div>
          <div className="pt-8">{referralLink}</div>
        </form>
      </div>
    </>
  );
}
