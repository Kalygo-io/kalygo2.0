import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts";
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
      recipientEmail: "tad@cmdlabs.io",
      subject: "A hyper-customized message...",
      messageAsText: "Message as text...",
      emailPreviewText: "Message Preview",
      logoOnclickUrl: "https://kalygo.io",
      logoImageUrl: "https://kalygo.io/kalygo_new_logo-192x192.png",
      greeting: "Hello,",
      paragraph1: "asdfasdf",
      paragraph2: "",
      paragraph3: "",
      paragraph4: "",
      ending: "Sincerely,",
      endingSignature: "Tad Duval",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const {
        recipientEmail,
        subject,
        messageAsText,
        emailPreviewText,
        logoOnclickUrl,
        logoImageUrl,
        greeting,
        paragraph1,
        paragraph2,
        paragraph3,
        paragraph4,
        ending,
        endingSignature,
      } = data;

      const config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/fun/send-email`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          recipientEmail,
          subject,
          messageAsText,
          emailPreviewText,
          logoOnclickUrl,
          logoImageUrl,
          greeting,
          paragraphs: {
            "1": paragraph1,
            "2": paragraph2,
            "3": paragraph3,
            "4": paragraph4,
          },
          ending,
          endingSignature,
        },
        withCredentials: true,
      };

      let resp = await axios(config);
      console.log(resp);
      infoToast(t("toast-messages:sending-email"));
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-0 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-5xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="recipientEmail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("forms:send-email.recipient-email")}
                </label>
                <div className="mt-2">
                  <input
                    {...register("recipientEmail", {
                      required: true,
                      pattern: new RegExp(
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/ // email regex
                      ),
                    })}
                    id="recipientEmail"
                    name="recipientEmail"
                    type="recipientEmail"
                    autoComplete="recipientEmail"
                    placeholder={t("forms:send-email.enter-recipient-email")!}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      errors["recipientEmail"] &&
                      "ring-red-700 focus:ring-red-500"
                    }`}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("forms:send-email.subject")}
                </label>
                <div className="mt-2">
                  <input
                    {...register("subject", {
                      required: true,
                    })}
                    id="subject"
                    name="subject"
                    type="text"
                    autoComplete="subject"
                    placeholder={t("forms:send-email.enter-subject")!}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      errors["subject"] && "ring-red-700 focus:ring-red-500"
                    }`}
                  />
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <label
                htmlFor="messageAsText"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("forms:send-email.message-as-text")}
              </label>
              <div className="mt-2">
                <textarea
                  {...register("messageAsText", {
                    required: true,
                  })}
                  id="messageAsText"
                  name="messageAsText"
                  rows={4}
                  autoComplete="messageAsText"
                  placeholder={t("forms:send-email.enter-message-as-text")!}
                  className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors["messageAsText"] && "ring-red-700 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>
            {/*  */}
            <div>
              <label
                htmlFor="emailPreviewText"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("forms:send-email.email-preview-text")}
              </label>
              <div className="mt-2">
                <input
                  {...register("emailPreviewText", {
                    required: true,
                  })}
                  id="emailPreviewText"
                  name="emailPreviewText"
                  type="text"
                  autoComplete="emailPreviewText"
                  placeholder={t("forms:send-email.enter-email-preview-text")!}
                  className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors["emailPreviewText"] &&
                    "ring-red-700 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>
            {/*  */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="logo-onclick-url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("forms:send-email.logo-onclick-url")}
                </label>
                <div className="mt-2">
                  <input
                    {...register("logoOnclickUrl", {
                      required: true,
                    })}
                    name="logo-onclick-url"
                    id="logo-onclick-url"
                    type="text"
                    autoComplete={"logo-onclick-url"}
                    placeholder={t("forms:send-email.enter-logo-onclick-url")!}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="logoImageUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("forms:send-email.logo-image-url")}
                </label>
                <div className="mt-2">
                  <input
                    {...register("logoImageUrl", {
                      required: true,
                    })}
                    name="logoImageUrl"
                    id="logoImageUrl"
                    type="text"
                    autoComplete={"logoImageUrl"}
                    placeholder={t("forms:send-email.enter-logo-image-url")!}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="greeting"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("forms:send-email.greeting")}
                </label>
                <div className="mt-2">
                  <input
                    {...register("greeting", {
                      required: true,
                    })}
                    name="greeting"
                    id="greeting"
                    type="text"
                    autoComplete={"greeting"}
                    placeholder={t("forms:send-email.enter-greeting")!}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <label
                htmlFor="paragraph1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("forms:send-email.paragraph-1")}
              </label>
              <div className="mt-2">
                <textarea
                  {...register("paragraph1", {
                    required: true,
                  })}
                  rows={4}
                  name="paragraph1"
                  id="paragraph1"
                  placeholder={t("forms:send-email.enter-paragraph-1")!}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
            {/*  */}
            <div>
              <label
                htmlFor="paragraph2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("forms:send-email.paragraph-2")}
              </label>
              <div className="mt-2">
                <textarea
                  {...register("paragraph2", {})}
                  rows={4}
                  name="paragraph2"
                  id="paragraph2"
                  placeholder={t("forms:send-email.enter-paragraph-2")!}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
            {/*  */}
            <div>
              <label
                htmlFor="paragraph3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("forms:send-email.paragraph-3")}
              </label>
              <div className="mt-2">
                <textarea
                  {...register("paragraph3", {})}
                  rows={4}
                  name="paragraph3"
                  id="paragraph3"
                  placeholder={t("forms:send-email.enter-paragraph-3")!}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
            {/*  */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="ending"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("forms:send-email.ending")}
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
                    placeholder={t("forms:send-email.ending")!}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      errors["ending"] && "ring-red-700 focus:ring-red-500"
                    }`}
                  />
                </div>
              </div>
              {/*  */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="endingSignature"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("forms:send-email.ending-signature")}
                </label>
                <div className="mt-2">
                  <input
                    {...register("endingSignature", {
                      required: true,
                    })}
                    id="endingSignature"
                    name="endingSignature"
                    type="endingSignature"
                    autoComplete="endingSignature"
                    placeholder={t("forms:send-email.enter-ending-signature")!}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      errors["endingSignature"] &&
                      "ring-red-700 focus:ring-red-500"
                    }`}
                  />
                </div>
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
