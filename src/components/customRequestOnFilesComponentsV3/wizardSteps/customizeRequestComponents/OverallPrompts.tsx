import React from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface P {
  register: UseFormRegister<{
    mode: string;
    model: "gpt-3.5-turbo" | "gpt-4o" | "gpt-4o-mini";
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
  }>;
  trigger: UseFormTrigger<{
    mode: string;
    model: "gpt-3.5-turbo" | "gpt-4o" | "gpt-4o-mini";
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
  }>;
  setValue: UseFormSetValue<{
    mode: string;
    model: "gpt-3.5-turbo" | "gpt-4o" | "gpt-4o-mini";
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
  }>;
}
export const OverallPrompts = (props: P) => {
  const { register, setValue, trigger } = props;

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
      {/* <div className="py-2">
        <label
          htmlFor="final-prompt"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Final File Prompt
        </label>
        <div className="mt-2">
          <textarea
            {...register("finalPrompt", {
              required: true,
            })}
            onChange={(e) => {
              setValue("finalPrompt", e.target.value);
              trigger();
            }}
            id="finalPrompt"
            name="finalPrompt"
            rows={4}
            placeholder="Final file prompt..."
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div> */}
      <div className="py-2">
        <label
          htmlFor="overall-prompt"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Overall Prompt
        </label>
        <div className="mt-2">
          <textarea
            {...register("overallPrompt", {
              required: true,
            })}
            onChange={(e) => {
              setValue("overallPrompt", e.target.value);
              trigger();
            }}
            id="overallPrompt"
            name="overallPrompt"
            rows={4}
            placeholder="Overall prompt..."
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};
