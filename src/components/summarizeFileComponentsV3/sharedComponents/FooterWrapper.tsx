import React, { ReactElement } from "react";

interface P {
  children: ReactElement;
}

export function FooterWrapper(props: P) {
  return (
    <div className="mx-auto w-full max-w-7xl mt-6 flex items-center justify-end gap-x-2">
      {props.children}
    </div>
  );
}
