import { classNames } from "@/utility/misc/classNames";
import React, { Fragment } from "react";

import { CloudIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

const actions = [
  {
    title: "Request time off",
    href: "#",
    icon: CloudIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Benefits",
    href: "#",
    icon: CloudIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Schedule a one-on-one",
    href: "#",
    icon: CloudIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Payroll",
    href: "#",
    icon: CloudIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Submit an expense",
    href: "#",
    icon: CloudIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    title: "Training",
    href: "#",
    icon: CloudIcon,
    iconForeground: "text-blue-700",
    iconBackground: "bg-blue-50",
  },
];

interface P {
  prompts: any[];
}

export const PromptsList = (p: P) => {
  const { prompts } = p;

  return (
    // <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0"></div>
    // <div className="p-4 divide-y divide-gray-200 overflow-visible rounded-lg bg-white shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
    // <div className="py-4 divide-x divide-y overflow-visible sm:grid sm:grid-cols-2">
    <div className="p-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {prompts.map((prompt, actionIdx) => (
        <div
          key={prompt.id}
          //   className={classNames(
          //     "group relative bg-white p-6 border-solid border-2 border-gray-500"
          //   )}
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
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Use
                          </span>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Edit
                          </span>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Share
                          </span>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
