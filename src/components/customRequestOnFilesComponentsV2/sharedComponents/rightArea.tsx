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
    /* <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6"> */
    // <div className="shrink-0 px-4 py-6 sm:px-6 lg:w-96 lg:pr-8 xl:pr-6"></div>
    // <div className="m-4 shrink-0 px-4 py-6 sm:px-6 lg:w-96 lg:pr-8 xl:pr-6 border-gray-200 border-t lg:border-l lg:border-t-0"></div>
    <div className="m-4 shrink-0 px-4 py-6 sm:px-6 lg:flex-1 lg:pr-8 xl:pr-6 border-t border-gray-200 lg:border-l lg:border-t-0">
      {props.children}
    </div>
  );
}
