import { navigatorLangDetector } from "@/lib/languageDetector";
import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useTranslation } from "next-i18next";

import { useForm } from "react-hook-form";

interface P {
  account: { email: string; firstName: string; lastName: string };
}

export function Personal(p: P) {
  const { t } = useTranslation();

  const {
    account: { email, firstName, lastName },
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
      email: email,
      firstName: firstName,
      lastName: lastName,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const { email, firstName, lastName } = data;
      console.log("data", data);

      var config = {
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          firstName,
          lastName,
        },
        withCredentials: true,
      };

      let resp = await axios(config);

      console.log("resp", resp);
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Personal
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
              <UserCircleIcon className="h-24 w-24 flex-none rounded-lg white object-cover" />
              {/* <div>
                <button
                  type="button"
                  className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white/20"
                >
                  Change avatar
                </button>
                <p className="mt-2 text-xs leading-5 text-black">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div> */}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-black"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  {...register("firstName", {})}
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="firstName"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-black"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  {...register("lastName", {})}
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="lastName"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-black"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  {...register("email", {
                    required: true,
                    pattern: new RegExp(
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    ),
                  })}
                  id="email"
                  name="email"
                  type="email"
                  readOnly
                  autoComplete="email"
                  //   className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors["email"] && "ring-red-700 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
