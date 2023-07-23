import React, { ReactElement } from "react";

interface P {
  children: ReactElement[];
}

export function Layout3ColumnWrapper(props: P) {
  return <div className="flex min-h-full flex-col">{props.children}</div>;
}
