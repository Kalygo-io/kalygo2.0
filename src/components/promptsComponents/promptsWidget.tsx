import { classNames } from "@/utility/misc/classNames";
import React, { Dispatch, Fragment, SetStateAction } from "react";

import {
  ChatBubbleLeftIcon,
  CheckCircleIcon,
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
    try {
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
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm py-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" />
          <input
            {...register("query", {
              required: true,
            })}
            type="text"
            placeholder="Search prompts..."
            className={`w-full py-3 pl-12 pr-12 rounded-md border-0 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-md sm:leading-6`}
          />
          <XMarkIcon
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-3"
            onClick={() => {
              console.log("--- --- ---");
              setQuery("");
              setValue("query", "");
              refresh((val: number) => val + 1);
            }}
          />
        </div>
      </form>

      {(prompts?.length || 0) > 0 ? (
        <ul role="list" className="divide-y divide-gray-100">
          {prompts.map((prompt: any) => (
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
                    {/* <a href={prompt?.author?.href} className="hover:underline">
                    {prompt?.author?.name}
                  </a> */}
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
              <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                {/* <div className="flex -space-x-0.5">
                <dt className="sr-only">Commenters</dt>
                {prompt?.commenters?.map((commenter: any) => (
                  <dd key={commenter.id}>
                    <img
                      className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                      src={commenter.imageUrl}
                      alt={commenter.name}
                    />
                  </dd>
                ))}
              </div> */}
                <div className="flex w-16 gap-x-2.5">
                  <span
                    className="right-6 top-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <span
                      className={classNames(
                        "inline-flex rounded-lg ring-4 ring-white"
                      )}
                    >
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="flex items-center rounded-full bg-gray-100 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-10 z-10">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon
                              className="h-6 w-6"
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
                          <Menu.Items
                            style={{ zIndex: 100 }}
                            className="absolute right-8 bottom-0 py-4 w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
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
                                text: "Edit",
                                onClick: () => {
                                  router.push(
                                    `/dashboard/prompt?prompt-id=${prompt.id}`
                                  );
                                },
                                icon: <PencilSquareIcon className="h-6 w-6" />,
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
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </span>
                  </span>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      ) : (
        <div>{t("dashboard-page:prompts.no-prompts-found")}</div>
      )}
    </>
  );
};
