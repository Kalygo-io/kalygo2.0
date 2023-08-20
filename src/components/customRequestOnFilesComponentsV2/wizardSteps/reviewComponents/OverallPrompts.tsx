import React from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface P {
  prompt: string;
  finalPrompt: string;
  overallPrompt: string;
}
export const OverallPrompts = (props: P) => {
  const { prompt, finalPrompt, overallPrompt } = props;

  return (
    <div className="rounded-md p-4 my-2">
      <div className="py-2">
        <label
          htmlFor="prompt"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Intermediate Prompt
        </label>
        <div className="mt-2">
          <textarea
            disabled
            readOnly
            id="prompt"
            name="prompt"
            rows={4}
            value={prompt}
            className={`block w-full rounded-md border-0 py-1.5 bg-slate-100 ${
              prompt ? "text-gray-800" : "text-gray-400"
            } shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
          />
        </div>
      </div>
      <div className="py-2">
        <label
          htmlFor="final-prompt"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Final Prompt
        </label>
        <div className="mt-2">
          <textarea
            disabled
            readOnly
            id="finalPrompt"
            name="finalPrompt"
            rows={4}
            value={finalPrompt}
            className={`block w-full rounded-md border-0 py-1.5 bg-slate-100 ${
              finalPrompt ? "text-gray-800" : "text-gray-400"
            } shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
          />
        </div>
      </div>
      <div className="py-2">
        <label
          htmlFor="overall-prompt"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Overall Prompt
        </label>
        <div className="mt-2">
          <textarea
            disabled
            readOnly
            id="overallPrompt"
            name="overallPrompt"
            rows={4}
            value={overallPrompt}
            className={`block w-full rounded-md border-0 py-1.5 bg-slate-100 ${
              overallPrompt ? "text-gray-800" : "text-gray-400"
            } shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
          />
        </div>
      </div>
    </div>
  );
};
