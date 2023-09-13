import { classNames } from "@/utility/misc/classNames";
import React, { Dispatch, Fragment, SetStateAction } from "react";

import {
  ClipboardDocumentIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  PencilSquareIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { GrView } from "react-icons/gr";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { deletePrompt } from "@/serviceFactory/deletePrompt";
import { useRouter } from "next/router";

interface P {
  prompts: any[];
  refresh: Dispatch<SetStateAction<number>>;
}

export const PromptsList = (p: P) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { prompts, refresh } = p;

  return prompts.length > 0 ? (
    <div className="p-4 divide-y divide-gray-200 overflow-y-scroll no-scrollbar rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {prompts.map((prompt, actionIdx) => (
        <div
          key={prompt.id}
          className={classNames("group relative bg-white p-6")}
        >
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {prompt.prompt}
            </h3>
            <p className="mt-2 text-xs text-gray-500">
              {new Date(prompt.updatedAt).toLocaleString()}
            </p>
          </div>
          <span
            className="absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <span
              className={classNames("inline-flex rounded-lg ring-4 ring-white")}
            >
              <Menu as="div" className="relative inline-block text-left">
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
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    {[
                      {
                        text: "Copy Prompt",
                        onClick: () => {
                          navigator.clipboard.writeText(prompt.prompt);
                        },
                        icon: <ClipboardDocumentIcon className="h-6 w-6" />,
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
      ))}
    </div>
  ) : (
    <div>{t("dashboard-page:prompts.no-prompts-yet")}</div>
  );
};
