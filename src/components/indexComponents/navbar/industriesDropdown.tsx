import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { GoBook, GoLaw, GoHeart, GoSearch, GoRocket } from "react-icons/go";
import { useTranslation } from "next-i18next";

export function IndustriesDropdown() {
  const { t } = useTranslation();

  const industries = [
    {
      name: t("navbar:dropdown.law"),
      href: "/law",
      icon: GoLaw,
    },
    { name: t("navbar:dropdown.higher-ed"), href: "/higher-ed", icon: GoBook },
    { name: t("navbar:dropdown.medical"), href: "/medical", icon: GoHeart },
    {
      name: t("navbar:dropdown.research"),
      href: "/research",
      icon: GoSearch,
    },
    {
      name: t("navbar:dropdown.marketing"),
      href: "/marketing",
      icon: GoRocket,
    },
  ];

  return (
    <Popover className="relative ">
      <Popover.Button
        as="a"
        className="cursor-pointer inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
      >
        <span>{t("navbar:dropdown.industries")}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-2 flex w-screen max-w-min -translate-x-1/2 px-4">
          <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {industries.map((item) => (
              <div
                key={item.name}
                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
              >
                <item.icon
                  className="h-6 w-6 text-gray-600 group-hover:text-blue-600"
                  aria-hidden="true"
                />
                <a href={item.href} className="font-semibold text-gray-900">
                  {item.name}
                  <span className="absolute inset-0" />
                </a>
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
