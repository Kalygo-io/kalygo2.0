import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { TFunction } from "next-i18next";
import { useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

type AdditionalProps = {
  className?: string;
  register: UseFormRegisterReturn<"password">;
  errors: FieldErrors<{
    email: string;
    password: string;
  }>;
  t: TFunction;
};

type P = React.PropsWithChildren<AdditionalProps>;

export function PasswordInput(p: P) {
  const { register, errors, t } = p;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <div className="relative w-full container mx-auto">
      <input
        {...register}
        type={isPasswordVisible ? "text" : "password"}
        id="password"
        name="password"
        autoComplete="password"
        placeholder={t("forms:enter-password")!}
        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
          errors["password"] && "ring-red-700 focus:ring-red-500"
        }`}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <EyeSlashIcon className="w-6 h-6" />
        ) : (
          <EyeIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
