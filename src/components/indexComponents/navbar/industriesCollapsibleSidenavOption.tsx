import { Fragment } from "react";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { GoBook, GoLaw, GoHeart } from "react-icons/go";
import { useTranslation } from "next-i18next";
import { classNames } from "@/utility/misc/classNames";

export function IndustriesCollapsibleSidenavOption() {
  const { t } = useTranslation();

  const industries = [
    {
      name: t("navbar:dropdown.law"),
      href: "/law",
      icon: GoLaw,
    },
    { name: t("navbar:dropdown.higher-ed"), href: "/highered", icon: GoBook },
    { name: t("navbar:dropdown.medical"), href: "/medical", icon: GoHeart },
  ];

  return (
    <Disclosure as="div">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              "-mx-3 inline-flex rounded-lg pl-3 py-2 w-full items-center text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            )}
          >
            <span>{t("navbar:dropdown.industries")}</span>
            <ChevronRightIcon
              className={classNames(
                open ? "rotate-90 text-gray-500" : "text-gray-400",
                "h-5 w-5 shrink-0"
              )}
              aria-hidden="true"
            />
          </Disclosure.Button>
          <Disclosure.Panel as="ul" className="mt-1 px-2">
            {industries.map((subItem) => (
              <li key={subItem.name}>
                <Disclosure.Button
                  as="a"
                  href={subItem.href}
                  className={classNames(
                    "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700"
                  )}
                >
                  {subItem.name}
                </Disclosure.Button>
              </li>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
