import React, { ReactElement } from "react";

interface P {
  children: ReactElement | ReactElement[];
}

export function MainArea(props: P) {
  return (
    <div className="m-4 px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
      {props.children}
    </div>
  );
}
