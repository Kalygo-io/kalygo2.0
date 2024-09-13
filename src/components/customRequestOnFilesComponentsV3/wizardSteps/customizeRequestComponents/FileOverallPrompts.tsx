import { SupportedAnthropicModels } from "@/types/SupportedAnthropicModels";
import { SupportedOpenAiModels } from "@/types/SupportedOpenAiModels";
import React from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface P {
  values: {
    mode: string;
    model: SupportedOpenAiModels | SupportedAnthropicModels;
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
    chunkSize: number;
  };
  register: UseFormRegister<{
    mode: string;
    model: SupportedOpenAiModels | SupportedAnthropicModels;
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
    chunkSize: number;
  }>;
  trigger: UseFormTrigger<{
    mode: string;
    model: SupportedOpenAiModels | SupportedAnthropicModels;
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
    chunkSize: number;
  }>;
  setValue: UseFormSetValue<{
    mode: string;
    model: SupportedOpenAiModels | SupportedAnthropicModels;
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
    chunkSize: number;
  }>;
}

export const FileOverallPrompts = (props: P) => {
  const { register, trigger, setValue } = props;

  return (
    <div className="bg-gray-800rounded-md p-4 my-2">
      <div className="py-2">
        <label
          htmlFor="prompt"
          className="block text-md font-medium leading-6 text-white"
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
            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="py-2">
        <label
          htmlFor="includeFinalPrompt"
          className="text-sm font-medium text-gray-700"
        >
          Include final prompt?
        </label>
        <input
          id="includeFinalPrompt"
          className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          type="checkbox"
          {...register("includeFinalPrompt")}
        />
      </div>

      {props?.values?.includeFinalPrompt && (
        <div className="py-2">
          <label
            htmlFor="finalPrompt"
            className="block text-md font-medium leading-6 text-white"
          >
            Final Prompt
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
              placeholder="Final prompt..."
              className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      )}
    </div>
  );
};
