import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

// drag drop file component
export function DragDropFile() {
  // drag state
  const [dragActive, setDragActive] = useState(false);

  // ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  // handle drag events
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);

      console.log("handleDrop");
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);

      console.log("handleChange");
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current!.click();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full flex justify-center">
          <form
            id="form-file-upload"
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
          >
            <div
              id="label-file-upload"
              className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
                dragActive ? "drag-active" : ""
              }`}
            >
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />

                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="input-file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      ref={inputRef}
                      type="file"
                      id="input-file-upload"
                      multiple={true}
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                {dragActive && (
                  <div
                    id="drag-file-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  ></div>
                )}
                <p className="text-xs leading-5 text-gray-600">
                  PDF, DOCX, TXT up to 10MB
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
