import React, { ReactElement } from "react";

interface P {
  children: ReactElement;
}

export function RightArea(props: P) {
  return (
    <div className="m-4 shrink-0 px-4 py-6 sm:px-6 lg:flex-1 lg:pr-8 xl:pr-6 border-t border-gray-200 lg:border-l lg:border-t-0">
      {props.children}
    </div>
  );
}
