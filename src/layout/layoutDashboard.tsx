"use client";

import { ReactNode, useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { useRouter } from "next/router";

import {
  Bars3Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
  LifebuoyIcon,
  UserCircleIcon,
  DocumentMagnifyingGlassIcon,
  QueueListIcon,
  CircleStackIcon,
  BeakerIcon,
  LockClosedIcon,
  CreditCardIcon,
  PuzzlePieceIcon,
  EnvelopeIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  FolderIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

import { PiBrain } from "react-icons/pi";
import { VscOutput } from "react-icons/vsc";

import { signOut } from "@/services/signOut";
import { useTranslation } from "next-i18next";
import { classNames } from "@/utility/misc/classNames";
import { errorReporter } from "@/utility/error/reporter";

interface P {
  children: ReactNode;
  account?: any;
}

export default function LayoutDashboard({ children, account }: P) {
  const router = useRouter();
  const { t } = useTranslation();
  const { pathname, query } = router;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/is-admin`,
          { withCredentials: true }
        );
        setIsAdmin(true);
      } catch (e) {
        errorReporter(e, false);
      }
    }
    checkAdmin();
  }, []);

  const segments = pathname.split("/");
  const current = segments[segments.length - 1];

  const navigation = [
    // {
    //   name: t("dashboard-page:navigation.overview"),
    //   href: "/dashboard",
    //   icon: HomeIcon,
    // },
    {
      name: t("dashboard-page:navigation.my-documents"),
      href: "/dashboard/my-docs",
      icon: HomeIcon,
    },
    {
      name: t("dashboard-page:navigation.prompts"),
      href: "/dashboard/prompts",
      icon: RectangleGroupIcon,
    },
    {
      name: t("dashboard-page:navigation.custom-request"),
      href: "/dashboard/custom-request-v3",
      icon: BeakerIcon,
    },
    {
      name: t("dashboard-page:navigation.summarize"),
      // href: "/dashboard/summarize",
      href: "/dashboard/summarize/summarize-v3",
      icon: LifebuoyIcon,
    },
    {
      name: t("dashboard-page:navigation.vector-search"),
      // href: "/dashboard/vector-search/vector-search-v2",
      href: "/dashboard/vector-search",
      icon: DocumentMagnifyingGlassIcon,
    },
    {
      name: t("dashboard-page:navigation.ocr"),
      // href: "/dashboard/vector-search/vector-search-v2",
      href: "/dashboard/ocr",
      icon: EyeIcon,
    },
    {
      name: t("dashboard-page:navigation.chunking-tool"),
      href: "/dashboard/chunking-tool",
      icon: PuzzlePieceIcon,
    },
    // {
    //   name: t("dashboard-page:navigation.text-to-speech"),
    //   href: "/dashboard/queue",
    //   icon: BiUserVoice,
    // },
    {
      name: t("dashboard-page:navigation.queue"),
      href: "/dashboard/queue",
      icon: QueueListIcon,
    },
    {
      name: t("dashboard-page:navigation.my-results"),
      href: "/dashboard",
      icon: VscOutput,
    },
    // {
    //   name: t("dashboard-page:navigation.my-documents"),
    //   href: "/dashboard/my-docs",
    //   icon: FolderIcon,
    // },
    {
      name: t("dashboard-page:navigation.access-groups"),
      href: "/dashboard/access-groups",
      icon: UserGroupIcon,
    },
    ...(isAdmin
      ? [
          {
            name: t("dashboard-page:navigation.rag"),
            href: "/dashboard/rag",
            icon: PiBrain,
          },
          {
            name: t("dashboard-page:navigation.send-email"),
            href: "/dashboard/send-email",
            icon: EnvelopeIcon,
          },
          {
            name: t("dashboard-page:navigation.admin"),
            href: "/dashboard/admin",
            icon: LockClosedIcon, // chartBar
          },
        ]
      : []),
    // { name: "A.I.", href: "/dashboard/ai", icon: LifebuoyIcon },
  ];

  const userNavigation = [
    {
      name: t("dashboard-page:user-nav.settings"),
      onClick: () => {
        // signOut(router, t);
        router.push("/dashboard/settings");
      },
    },
    {
      name: t("dashboard-page:user-nav.sign-out"),
      onClick: () => {
        signOut(router, t);
      },
    },
  ];

  const totalCredits = account ? (
    <>
      <span className="text-sm text-gray-700">
        {account.vectorSearchCredits +
          account.summaryCredits +
          account.customRequestCredits}{" "}
        {account.vectorSearchCredits + account.summaryCredits === 1
          ? t("dashboard-page:user-nav.free-credit")
          : t("dashboard-page:user-nav.free-credits")}
      </span>
      <CircleStackIcon
        className="text-black h-6 w-6"
        aria-label="Usage Credits Icon"
      />
    </>
  ) : (
    <></>
  );

  const usageCredits =
    account && account.usageCredits ? (
      <>
        <span className="text-sm text-gray-700">
          {account.usageCredits.toLocaleString(navigator.language, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {" Credits"}
        </span>
        <CircleStackIcon
          className="text-blue-600 h-6 w-6"
          aria-label="Usage Credits Icon"
        />
      </>
    ) : (
      <></>
    );

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
                        <Image
                          className="h-8 w-auto"
                          src="/kalygo_new_logo-192x192.png"
                          alt="Kalygo logo"
                          width={16}
                          height={16}
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
                        <ul className="mt-auto space-y-1">
                          <li>
                            <Link
                              href="/dashboard/buy-credits"
                              className={classNames(
                                "buy-credits" === current
                                  ? "bg-blue-700 text-white"
                                  : "text-blue-200 hover:text-white hover:bg-blue-700",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <CreditCardIcon
                                className="h-6 w-6 shrink-0 text-blue-200 group-hover:text-white"
                                aria-hidden="true"
                              />
                              {t("dashboard-page:navigation.buy-credits")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/settings"
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
                              {t("dashboard-page:navigation.settings")}
                            </Link>
                          </li>
                        </ul>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-blue-600 px-6 pb-4 z-0">
            <Link className="mt-2 p-1" href="/">
              <div className="flex h-16 shrink-0 items-center">
                <Image
                  className="h-8 w-auto"
                  src="/kalygo_new_logo-192x192.png"
                  alt="Kalygo logo"
                  height={16}
                  width={16}
                />
                &nbsp;
                <span className="text-sm font-semibold leading-6 text-white">
                  {t("common:company-name")}
                </span>
              </div>
            </Link>
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
                <ul className="mt-auto space-y-1">
                  <li>
                    <Link
                      href="/dashboard/buy-credits"
                      className={classNames(
                        "buy-credits" === current
                          ? "bg-blue-700 text-white"
                          : "text-blue-200 hover:text-white hover:bg-blue-700",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <CreditCardIcon
                        className="h-6 w-6 shrink-0 text-blue-200 group-hover:text-white"
                        aria-hidden="true"
                      />
                      {t("dashboard-page:navigation.buy-credits")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/settings"
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
                      {t("dashboard-page:navigation.settings")}
                    </Link>
                  </li>
                </ul>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div
            id="dashboard-sticky-top-nav"
            className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-0 border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
          >
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
              <div className="flex items-center gap-x-2 lg:gap-x-2">
                {totalCredits}
                {usageCredits}
                {/* <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Separator */}
                <div
                  className="block h-6 w-px bg-gray-900/10 ml-2 mr-2"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-8 w-8 rounded-full bg-gray-50" />
                    <span className="hidden lg:flex lg:items-center">
                      {/* <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        Welcome
                      </span> */}
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
                            <>
                              <span
                                onClick={item.onClick}
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                                )}
                              >
                                {item.name}
                              </span>
                            </>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
