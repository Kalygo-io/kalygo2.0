import { SupportedAnthropicModels } from "@/types/SupportedAnthropicModels";
import { SupportedOpenAiModels } from "@/types/SupportedOpenAiModels";
import React from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface P {
  register: UseFormRegister<{
    mode: string;
    model: SupportedOpenAiModels | SupportedAnthropicModels;
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
  }>;
  trigger: UseFormTrigger<{
    mode: string;
    model: SupportedOpenAiModels | SupportedAnthropicModels;
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
  }>;
  setValue: UseFormSetValue<{
    mode: string;
    model: SupportedOpenAiModels | SupportedAnthropicModels;
    prompt: string;
    includeFinalPrompt: boolean;
    finalPrompt: string;
    overallPrompt: string;
  }>;
}

export const FileInChunksPrompts = (props: P) => {
  const { register, trigger, setValue } = props;

  return (
    <div className="bg-gray-800 rounded-md p-4 my-2">
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
              console.log("prompt - onChange");
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
    </div>
  );
};
