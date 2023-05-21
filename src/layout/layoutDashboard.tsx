"use client";

import { ReactNode } from "react";

import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";

import Image from "next/image";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export

import { useRouter } from "next/router";

import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  LifebuoyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { signOut } from "@/services/signOut";
import { useTranslation } from "next-i18next";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  {
    name: "Templates",
    href: "/dashboard/templates",
    icon: UsersIcon,
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: DocumentDuplicateIcon,
  },
  { name: "A.I.", href: "/dashboard/ai", icon: LifebuoyIcon },
];
const ecosystem = [
  { id: 1, name: "Mock Jury", href: "#", initial: "J", current: false },
  { id: 2, name: "Tokenize", href: "#", initial: "T", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface P {
  children: ReactNode;
}

export default function LayoutDashboard({ children }: P) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { pathname, query } = router;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const segments = pathname.split("/");
  const current = segments[segments.length - 1];

  const userNavigation = [
    {
      name: "Sign out",
      onClick: () => {
        signOut(router, t);
      },
    },
  ];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link href="/">
                        <img
                          className="h-8 w-auto"
                          src="/logo192.png"
                          alt="Kalygo logo"
                        />
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.href.split("/")[
                                      item.href.split("/").length - 1
                                    ] === current
                                      ? "bg-blue-700 text-white"
                                      : "text-blue-200 hover:text-white hover:bg-blue-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.href.split("/")[
                                        item.href.split("/").length - 1
                                      ] === current
                                        ? "text-white"
                                        : "text-blue-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* <li>
                          <div className="text-xs font-semibold leading-6 text-blue-200">
                            Ecosystem
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {ecosystem.map((team) => (
                              <li key={team.name}>
                                <span
                                  // href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-blue-700 text-white"
                                      : "text-blue-200 hover:text-white hover:bg-blue-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-blue-400 bg-blue-500 text-[0.625rem] font-medium text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </li> */}
                        <li className="mt-auto">
                          <Link
                            href="/dashboard/settings"
                            // className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-blue-200 hover:bg-blue-700 hover:text-white"
                            className={classNames(
                              "settings" === current
                                ? "bg-blue-700 text-white"
                                : "text-blue-200 hover:text-white hover:bg-blue-700",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-blue-200 group-hover:text-white"
                              aria-hidden="true"
                            />
                            Settings
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src="/logo192.png"
                  alt="Kalygo logo"
                />
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.href.split("/")[
                              item.href.split("/").length - 1
                            ] === current
                              ? "bg-blue-700 text-white"
                              : "text-blue-200 hover:text-white hover:bg-blue-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.href.split("/")[
                                item.href.split("/").length - 1
                              ] === current
                                ? "text-white"
                                : "text-blue-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li>
                  <div className="text-xs font-semibold leading-6 text-blue-200">
                    Ecosystem
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {ecosystem.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-blue-700 text-white"
                              : "text-blue-200 hover:text-white hover:bg-blue-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-blue-400 bg-blue-500 text-[0.625rem] font-medium text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li> */}
                <li className="mt-auto">
                  <Link
                    href="/dashboard/settings"
                    className={classNames(
                      "settings" === current
                        ? "bg-blue-700 text-white"
                        : "text-blue-200 hover:text-white hover:bg-blue-700",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                    // className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-blue-200 hover:bg-blue-700 hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-blue-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-0 border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-8 w-8 rounded-full bg-gray-50" />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        Welcome
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <span
                              onClick={item.onClick}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                              )}
                            >
                              {item.name}
                            </span>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">{children}</main>
        </div>
      </div>
    </>
  );
}
