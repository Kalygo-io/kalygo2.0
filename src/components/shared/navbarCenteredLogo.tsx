import { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "@/components/shared/Link";
import { useTranslation } from "next-i18next";
import { IndustriesDropdown } from "../indexComponents/navbar/industriesDropdown";
import { FlyoutMenu } from "../indexComponents/navbar/flyoutMenu";
import { IndustriesCollapsibleSidenavOption } from "../indexComponents/navbar/industriesCollapsibleSidenavOption";
import { GoBook, GoHeart, GoLaw } from "react-icons/go";
import { classNames } from "@/utility/misc/classNames";

interface P {
  disableStickyTopNav?: boolean;
}

export function NavbarCenteredLogo(p: P) {
  const { disableStickyTopNav } = p;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const navigation = [
    { name: t("navbar:navbar-about"), href: "/about" },
    { name: t("navbar:navbar-feedback"), href: "/feedback" },
    { name: t("navbar:navbar-blog"), href: "/blog" },
  ];

  return (
    <>
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
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    <Link href="/" className="-m-1.5 p-1.5">
                      <span className="sr-only">
                        {t("common:company-name")}
                      </span>
                      <Image
                        className="h-8 w-auto"
                        src="/kalygo_new_logo-192x192_dark_blue.png"
                        alt="Kalygo logo"
                        width={192}
                        height={192}
                      />
                    </Link>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                key={item.name}
                                href={item.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                          <li>
                            <IndustriesCollapsibleSidenavOption />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header
        className={
          disableStickyTopNav
            ? "absolute inset-x-0 top-0 z-50"
            : "sticky top-0 z-10 bg-white shadow"
        }
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-1">
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
              {/* <IndustriesDropdown /> */}
              <FlyoutMenu />
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">{t("common:open-main-menu")}</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{t("common:company-name")}</span>
            <div className="flex items-center">
              <Image
                className="h-8 w-auto"
                src="/kalygo_new_logo-192x192_dark_blue.png"
                alt="Kalygo logo"
                width={192}
                height={192}
              />
              &nbsp;
              <span className="text-sm font-semibold leading-6 text-gray-900">
                {t("common:company-name")}
              </span>
            </div>
          </Link>
          <div className="flex flex-1 justify-end">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {t("common:log-in")} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
