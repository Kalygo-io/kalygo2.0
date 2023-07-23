import React, { ReactElement } from "react";

interface P {
  children: ReactElement | ReactElement[];
}

export function LeftArea(props: P) {
  return (
    <div className="m-4 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6 border-gray-200 border-b xl:border-b-0 xl:border-r">
      {props.children}
    </div>
  );
}
