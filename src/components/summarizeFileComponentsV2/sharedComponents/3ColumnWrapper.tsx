import React, { ReactElement } from "react";

interface P {
  children: ReactElement | ReactElement[];
}

export function _3ColumnWrapper(props: P) {
  return (
    <div className="m-4 mb-0 mx-auto w-full max-w-7xl grow lg:flex xl:px-2 border-b border-black">
      {props.children}
    </div>
  );
}
