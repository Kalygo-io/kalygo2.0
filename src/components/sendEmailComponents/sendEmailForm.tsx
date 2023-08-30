import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";
import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";

export const SendEmailForm = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      greeting: "",
      paragraph1: "",
      ending: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;

      const config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/fun/send-email`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
        withCredentials: true,
      };

      // setSignUpState({
      //   error: null,
      //   loading: true,
      //   val: null,
      // });

      let resp = await axios(config);
      console.log(resp);
      // infoToast(t("toast-messages:sign-up-success"));

      // setSignUpState({
      //   error: null,
      //   loading: false,
      //   val: null,
      // });

      // const detectedLng = languageDetector.detect();
      // const detectedLng = navigatorLangDetector();
      // router.push(`/${detectedLng}/`);
    } catch (e) {
      // setSignUpState({
      //   error: e,
      //   loading: false,
      //   val: null,
      // });

      errorReporter(e);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("forms:email-address")}
              </label>
              <div className="mt-2">
                <input
                  {...register("email", {
                    required: true,
                    pattern: new RegExp(
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/ // email regex
                    ),
                  })}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("forms:enter-email")!}
                  className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors["email"] && "ring-red-700 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="greeting"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("forms:greeting")}
              </label>
              <div className="mt-2">
                <input
                  {...register("greeting", {
                    required: true,
                  })}
                  id="greeting"
                  name="greeting"
                  type="greeting"
                  autoComplete="greeting"
                  placeholder={t("forms:greeting")!}
                  className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors["greeting"] && "ring-red-700 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>
            {/*  */}
            <div>
              <label
                htmlFor="paragraph1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("forms:paragraph1")}
              </label>
              <div className="mt-2">
                <textarea
                  {...register("paragraph1", {
                    required: true,
                  })}
                  rows={4}
                  name="paragraph1"
                  id="paragraph1"
                  placeholder="Your message here"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
            {/*  */}
            <div>
              <label
                htmlFor="ending"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("forms:ending")}
              </label>
              <div className="mt-2">
                <input
                  {...register("ending", {
                    required: true,
                  })}
                  id="ending"
                  name="ending"
                  type="ending"
                  autoComplete="ending"
                  placeholder={t("forms:ending")!}
                  className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors["ending"] && "ring-red-700 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>
            <div>
              <button className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Send email
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
