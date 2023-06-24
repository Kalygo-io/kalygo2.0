import React from "react";

export const Divider = () => {
  return (
    <div className="relative p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
    </div>
  );
};
