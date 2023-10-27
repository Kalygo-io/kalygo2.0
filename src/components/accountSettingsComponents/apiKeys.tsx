import { SupportedApiKeys } from "@/types/SupportedApiKeys";
import { errorReporter } from "@/utility/error/reporter";
import { successToast } from "@/utility/toasts";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface P {
  account: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    AwsSecretsManagerApiKey: {
      accountId: number;
      id: number;
      secretId: string;
      type: SupportedApiKeys;
      preview: string;
    }[];
  };
  refresh: any;
  id: string;
}

export function ApiKeys(p: P) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

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
      openAiApiKey:
        account?.AwsSecretsManagerApiKey.find(
          (i) => i.type === SupportedApiKeys.OPEN_AI_API_KEY
        )?.preview || "",
      awsSesAccessKey:
        account?.AwsSecretsManagerApiKey.find(
          (i) => i.type === SupportedApiKeys.AWS_SES_ACCESS_KEY
        )?.preview || "",
      awsSesSecretKey:
        account?.AwsSecretsManagerApiKey.find(
          (i) => i.type === SupportedApiKeys.AWS_SES_SECRET_KEY
        )?.preview || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const { openAiApiKey, awsSesAccessKey, awsSesSecretKey } = data;

      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/add-api-key`,
        headers: {
          "Content-Type": "application/json",
        },
        data: [
          {
            type: SupportedApiKeys.OPEN_AI_API_KEY,
            value: openAiApiKey,
          },
          {
            type: SupportedApiKeys.AWS_SES_ACCESS_KEY,
            value: awsSesAccessKey,
          },
          {
            type: SupportedApiKeys.AWS_SES_SECRET_KEY,
            value: awsSesSecretKey,
          },
        ],
        withCredentials: true,
      };

      let resp = await axios(config);

      successToast(t("toast-messages:store-api-key-success"));
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
            {t("dashboard-page:settings.api-keys.title")}
          </h2>
        </div>

        {/* <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2">
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
              {t("dashboard-page:settings.api-keys.save")}
            </button>
          </div>
        </form> */}
        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2">
          <div className="space-y-12 sm:space-y-16">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {t("dashboard-page:settings.api-keys.your-api-keys")}
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                {t("dashboard-page:settings.api-keys.your-api-keys-desc")}
              </p>

              <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="openAiApiKey"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    {t("dashboard-page:settings.api-keys.OPEN_AI_API_KEY")}
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      {...register("openAiApiKey", {})}
                      type="text"
                      name="openAiApiKey"
                      id="openAiApiKey"
                      autoComplete="openAiApiKey"
                      placeholder={
                        t(
                          "dashboard-page:settings.api-keys.OPEN_AI_API_KEY-placeholder"
                        )!
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="awsSesAccessKey"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    {t("dashboard-page:settings.api-keys.AWS_SES_ACCESS_KEY")}
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      {...register("awsSesAccessKey", {})}
                      type="text"
                      name="awsSesAccessKey"
                      id="awsSesAccessKey"
                      autoComplete="awsSesAccessKey"
                      placeholder={
                        t(
                          "dashboard-page:settings.api-keys.AWS_SES_ACCESS_KEY-placeholder"
                        )!
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="awsSesSecretKey"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    {t("dashboard-page:settings.api-keys.AWS_SES_SECRET_KEY")}
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      {...register("awsSesSecretKey", {})}
                      type="text"
                      name="awsSesSecretKey"
                      id="awsSesSecretKey"
                      autoComplete="awsSesSecretKey"
                      placeholder={
                        t(
                          "dashboard-page:settings.api-keys.AWS_SES_SECRET_KEY-placeholder"
                        )!
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {t("dashboard-page:settings.api-keys.save")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
