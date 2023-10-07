import React, { JSXElementConstructor, ReactElement } from "react";

interface P {
  children:
    | any
    | ReactElement
    | ReactElement[]
    | ReactElement<any, string | JSXElementConstructor<any>>[];
}

export function RightArea(props: P) {
  return (
    <div className="m-4 shrink-0 px-4 py-6 sm:px-6 lg:w-64 lg:pr-8 xl:pr-6 border-t border-gray-200 lg:border-l lg:border-t-0">
      {props.children}
    </div>
  );
}
