import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorToast, infoToast } from "@/utility/toasts";

export function Mailing() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    const { email } = data;

    try {
      console.log("data", data);

      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/mailingList/join`,
        {
          email,
          name: "N/A",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      infoToast(t("toast-messages:you-joined-the-mailing-list"));
      reset();
    } catch (e) {
      errorToast(t("toast-messages:error.something-unexpected-happened"));
      console.error(e);
    }
  };

  return (
    <div className="bg-white py-24 pb-8 pt-32">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-blue-600 px-6 py-16 shadow-xl sm:rounded-3xl sm:px-24 xl:py-16">
          <div className="flex w-full justify-center items-center">
            <Image
              alt={t("image-alt-tags:logo192.png")}
              src="/logo192.png"
              width={100}
              height={100}
            />
          </div>
          <h2 className="mx-auto mt-2 max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("email-page:stay-in-touch")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-white">
            {t("email-page:feedback-is-essential")}
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-10 flex max-w-md gap-x-4"
          >
            <label htmlFor="email" className="sr-only">
              {t("forms:email-address")}
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: new RegExp(
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/
                ),
              })}
              id="email"
              name="email"
              placeholder={t("forms:enter-email")!}
              autoComplete="email"
              className={`min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 ${
                errors["email"] && "ring-red-700 focus:ring-red-500"
              }`}
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("email-page:sign-me-up")}
            </button>
          </form>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient
                id="759c1415-0410-454c-8f7c-9a820de03641"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#2463eb" />
                <stop offset={1} stopColor="#61dbfb" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
