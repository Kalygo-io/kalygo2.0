import React from "react";

interface P {
  account: any;
}

export const Personal = (p: P) => {
  const { account } = p;

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-black">
          Personal
        </h2>
      </div>

      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full flex items-center gap-x-8">
            <img
              src="https://media.kalygo.io/test_profile_photo.jpg"
              alt="avatar"
              className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
            />
            {/* <div>
              <button
                type="button"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                Change avatar
              </button>
              <p className="mt-2 text-xs leading-5 text-gray-400">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div> */}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                readOnly
                value={account.firstName || ""}
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className={`bg-slate-100 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                readOnly
                value={account.lastName || ""}
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className={`bg-slate-100 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-black"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                readOnly
                value={account.email || ""}
                name="email"
                type="email"
                autoComplete="email"
                className={`bg-slate-100 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
