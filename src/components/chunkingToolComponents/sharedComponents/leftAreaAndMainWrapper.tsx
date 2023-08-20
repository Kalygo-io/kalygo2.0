import React, { ReactElement } from "react";

interface P {
  children: ReactElement[];
}

export function LeftAreaAndMainWrapper(props: P) {
  return (
    /* Left sidebar & main wrapper */
    <div className="flex-1 xl:flex">{props.children}</div>
  );
}
