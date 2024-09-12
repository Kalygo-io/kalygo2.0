import React from "react";

interface P {
  prompt: string;
}

export const FilePerPagePrompts = (props: P) => {
  const { prompt } = props;

  return (
    <div className="rounded-md p-4 my-2">
      <div className="py-2">
        <label
          htmlFor="prompt"
          className="block text-md font-medium leading-6 text-white"
        >
          Prompt
        </label>
        <textarea
          disabled
          readOnly
          defaultValue={prompt || "No prompt provided"}
          rows={4}
          name="prompt"
          id="prompt"
          className={`block w-full rounded-md border-0 py-1.5 bg-slate-100 ${
            prompt ? "text-gray-800" : "text-gray-400"
          } shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
        />
      </div>
    </div>
  );
};
