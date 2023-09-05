import React from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface P {
  register: UseFormRegister<{
    mode: string;
    model: "gpt-3.5-turbo" | "gpt-4";
    prompt: string | undefined;
    includeFinalPrompt: boolean | undefined;
    finalPrompt: string | undefined;
    overallPrompt: string | undefined;
  }>;
  trigger: UseFormTrigger<{
    mode: string;
    model: "gpt-3.5-turbo" | "gpt-4";
    prompt: string | undefined;
    includeFinalPrompt: boolean | undefined;
    finalPrompt: string | undefined;
    overallPrompt: string | undefined;
  }>;
  setValue: UseFormSetValue<{
    mode: string;
    model: "gpt-3.5-turbo" | "gpt-4";
    prompt: string | undefined;
    includeFinalPrompt: boolean | undefined;
    finalPrompt: string | undefined;
    overallPrompt: string | undefined;
  }>;
}

export const EachFilePerPagePrompts = (props: P) => {
  const { register, trigger, setValue } = props;

  return (
    <div className="bg-slate-100 rounded-md p-4 my-2">
      <div className="py-2">
        <label
          htmlFor="prompt"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Prompt
        </label>
        <div className="mt-2">
          <textarea
            {...register("prompt", {
              required: true,
            })}
            onChange={(e) => {
              console.log("prompt - onChange");
              setValue("prompt", e.target.value);
              trigger();
            }}
            id="prompt"
            name="prompt"
            rows={4}
            placeholder="Prompt..."
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};
