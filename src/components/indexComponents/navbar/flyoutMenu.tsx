import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { FilmIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

import { LiaNotesMedicalSolid } from "react-icons/lia";

import { IoShareSocialOutline } from "react-icons/io5";

import { PiExam } from "react-icons/pi";
import { GiArchiveResearch } from "react-icons/gi";

import { TbWriting } from "react-icons/tb";

const media = [
  { name: "Editing", href: "/marketing", icon: FilmIcon },
  { name: "Audio", href: "/marketing", icon: SpeakerWaveIcon },
];

const agents = [
  { name: "R.A.G. agents", href: "/highered", icon: GiArchiveResearch },
  { name: "Swarms", href: "/highered", icon: UserGroupIcon },
];

export function FlyoutMenu() {
  return (
    <Popover className="">
      <Popover.Button
        as="a"
        className="cursor-pointer inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
      >
        Features
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
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
              <div>
                <h3 className="text-sm font-medium leading-6 text-gray-500">
                  Media
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {media.map((item) => (
                      <span
                        key={item.name}
                        // href={item.href}
                        className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                      >
                        <item.icon
                          className="h-6 w-6 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium leading-6 text-gray-500">
                  Agents
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {agents.map((item) => (
                      <span
                        key={item.name}
                        // href={item.href}
                        className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                      >
                        <item.icon
                          className="h-6 w-6 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </span>
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
