import React, { ReactElement } from "react";

interface P {
  children: ReactElement[];
}

export function LeftAreaAndMainWrapper(props: P) {
  return <div className="flex-1 xl:flex">{props.children}</div>;
}
