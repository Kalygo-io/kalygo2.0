import { classNames } from "@/utility/misc/classNames";
import React, { Dispatch, Fragment, SetStateAction } from "react";

import {
  ArrowPathIcon,
  ClipboardDocumentIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ShareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { deletePrompt } from "@/serviceFactory/deletePrompt";
import { useRouter } from "next/router";
import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useGetPromptsWithAccessGroups } from "@/utility/hooks/getPromptsWithAccessGroups";
import { similaritySearchForPrompts } from "@/serviceFactory/similaritySearchForPrompts";

interface P {
  prompts: any;
  setPrompts: any;
  refresh: any;
  query: string;
  setQuery: any;
}

export const PromptsWidget = (p: P) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { prompts, refresh, setPrompts, query, setQuery } = p;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      query: query || "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("---", data);
    try {
      console.log("---", data);
      setPrompts({
        val: [],
        loading: true,
        error: null,
      });
      const { query } = data;
      const config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/prompts/search`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query,
        },
        withCredentials: true,
      };
      let resp = await axios(config);
      setQuery(query);
      setPrompts({
        val: resp.data,
        loading: false,
        error: null,
      });
      console.log("resp", resp);
    } catch (e) {
      setPrompts({
        val: [],
        loading: false,
        error: true,
      });

      errorReporter(e);
    }
  };

  return (
    <>
      <div className="max-w-sm py-4 flex items-center space-x-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative rounded-md shadow-sm">
            <MagnifyingGlassIcon className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" />
            <input
              {...register("query", {
                required: true,
              })}
              type="text"
              name="query"
              className="block w-full rounded-md border-0 py-2 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-md sm:leading-6"
              placeholder="Search"
            />
          </div>
        </form>
        <div className="right-0 flex items-center">
          <label htmlFor="clear" className="sr-only">
            Clear
          </label>
          <button
            id="clear"
            name="clear"
            className="h-full rounded-md border-0 bg-transparent py-2 pl-2 pr-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            onClick={() => {
              console.log("!!!");

              setQuery("");
              setValue("query", "");
              refresh((val: number) => val + 1);
            }}
          >
            <XMarkIcon className="top-0 bottom-0 w-6 h-6 my-auto text-gray-400" />
          </button>
        </div>
      </div>

      {(prompts?.length || 0) > 0 ? (
        <ul role="list" className="divide-y divide-gray-100">
          {prompts.map((prompt: any) => {
            return (
              <li
                key={prompt.id}
                className="flex flex-wrap justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
              >
                <div>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {prompt.prompt}
                  </p>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p>
                      {/* Created By */}
                      {/*
                      <a href={prompt?.author?.href} className="hover:underline">
                        {prompt?.author?.name}
                      </a>
                      */}
                    </p>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p>
                      <time dateTime={prompt.updatedAt}>
                        {new Date(prompt.updatedAt).toLocaleString()}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute sm:right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {[
                            {
                              text: "Copy Prompt",
                              onClick: () => {
                                navigator.clipboard.writeText(prompt.prompt);
                              },
                              icon: (
                                <ClipboardDocumentIcon className="h-6 w-6" />
                              ),
                            },
                            {
                              text: "View/Edit",
                              onClick: () => {
                                router.push(
                                  `/dashboard/prompt?prompt-id=${prompt.id}`
                                );
                              },
                              icon: <PencilSquareIcon className="h-6 w-6" />,
                            },
                            {
                              text: "More like this",
                              onClick: async () => {
                                setPrompts({
                                  val: [],
                                  loading: true,
                                  error: null,
                                });

                                // prettier-ignore
                                const resp = await similaritySearchForPrompts(
                                  prompt.prompt
                                );
                                console.log(
                                  "similaritySearchForPrompts RESULTS",
                                  resp
                                );
                                setPrompts({
                                  val: resp?.data,
                                  loading: false,
                                  error: null,
                                });
                                // refresh((val: any) => val + 1);
                              },
                              icon: <ArrowPathIcon className="h-6 w-6" />,
                            },
                            {
                              text: "Delete",
                              onClick: async () => {
                                console.log("deleting prompt...", prompt);

                                await deletePrompt(prompt.id);
                                console.log("prompt deleted");
                                refresh((val: any) => val + 1);
                              },
                              icon: <TrashIcon className="h-6 w-6" />,
                            },
                          ].map((i, idx) => {
                            return (
                              <Menu.Item key={idx}>
                                {({ active }) => (
                                  <span
                                    onClick={i.onClick}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "px-4 py-2 text-sm flex justify-center items-center cursor-pointer"
                                    )}
                                  >
                                    {i.text}&nbsp;
                                    {i.icon}
                                  </span>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>{t("dashboard-page:prompts.no-prompts-found")}</div>
      )}
    </>
  );
};
