import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

import { LiaNotesMedicalSolid } from "react-icons/lia";

import { IoShareSocialOutline } from "react-icons/io5";

import { GoBook, GoLaw, GoHeart, GoSearch, GoRocket } from "react-icons/go";
import { BiShieldPlus, BiBuildingHouse } from "react-icons/bi";
import { MdFamilyRestroom, MdOutlinePersonalInjury } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { GiArchiveResearch } from "react-icons/gi";

import { TbWriting } from "react-icons/tb";

const law = [
  { name: "Personal Injury", href: "/law", icon: MdOutlinePersonalInjury },
  { name: "Family Law", href: "/law", icon: MdFamilyRestroom },
  { name: "Civil Litigation", href: "/law", icon: GoLaw },
  { name: "Insurance Defense", href: "/law", icon: BiShieldPlus },
  { name: "Real Estate", href: "/law", icon: BiBuildingHouse },
];

const marketing = [
  { name: "Email", href: "/marketing", icon: EnvelopeIcon },
  { name: "Social Media", href: "/marketing", icon: IoShareSocialOutline },
];

const higherEd = [
  { name: "Exam Generation", href: "/highered", icon: PiExam },
  { name: "Research", href: "/highered", icon: GiArchiveResearch },
  { name: "Essay Drafting", href: "/highered", icon: TbWriting },
];

const medical = [
  { name: "Research", href: "/medical", icon: GiArchiveResearch },
  { name: "Patient Notes", href: "/medical", icon: LiaNotesMedicalSolid },
];

export function FlyoutMenu() {
  return (
    <Popover className="">
      <Popover.Button
        as="a"
        className="cursor-pointer inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
      >
        Industries
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>
      {/* </div>
      </div> */}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Panel className="absolute inset-x-0 top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-1 lg:px-8">
            <div className="grid grid-cols-4 gap-x-6 sm:gap-x-8">
              <div>
                <h3 className="text-sm font-medium leading-6 text-gray-500">
                  Legal
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {law.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                      >
                        <item.icon
                          className="h-6 w-6 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium leading-6 text-gray-500">
                  Marketing
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {marketing.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                      >
                        <item.icon
                          className="h-6 w-6 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium leading-6 text-gray-500">
                  Higher Education
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {higherEd.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                      >
                        <item.icon
                          className="h-6 w-6 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium leading-6 text-gray-500">
                  Medical
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {medical.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                      >
                        <item.icon
                          className="h-6 w-6 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
