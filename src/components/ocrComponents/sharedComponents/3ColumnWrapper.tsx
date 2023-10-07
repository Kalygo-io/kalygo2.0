import React, { ReactElement } from "react";

interface P {
  children: ReactElement | ReactElement[];
}

export function _3ColumnWrapper(props: P) {
  return (
    // mx-auto w-full max-w-7xl grow lg:flex xl:px-2 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:pb-0
    <div className="m-4 mb-0 pb-4 mx-auto w-full max-w-7xl grow lg:flex xl:px-2 border-b border-black">
      {props.children}
    </div>
  );
}
