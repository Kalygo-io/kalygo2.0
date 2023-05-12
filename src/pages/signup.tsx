"use client";

import { useForm } from "react-hook-form";
import Layout1 from "@/layout/layout1";
import Head from "next/head";
import Link from "next/link";
import ErrorBoundary from "@/components/shared/errorBoundary";
import { useEffect } from "react";
import Image from "next/image";

export default function Signup() {
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
    },
  });

  const onSubmit = async (data: any) => {
    const { email } = data;

    console.log("email", email);

    // throw new Error("___ _!_!_ ___");

    // try {
    //   console.log("___ ___ ___");
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <>
      <Head>
        <title>Kalygo Sign Up Page</title>
        <meta name="description" content="Sign up and experience Kalygo." />
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="/logo192.png"
            alt="Kalygo logo"
            width={192}
            height={192}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                {...register("email", {
                  required: true,
                  pattern: new RegExp(
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                  ),
                })}
                id="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                  errors["email"] && "ring-red-700 focus:ring-red-500"
                }`}
              />
            </div>
            <div>
              <button
                // type="submit"
                onClick={() => {}}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              href="/"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
