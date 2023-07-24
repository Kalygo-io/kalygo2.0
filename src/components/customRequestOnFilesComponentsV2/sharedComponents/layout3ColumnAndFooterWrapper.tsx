import React, { ReactElement } from "react";

interface P {
  children: ReactElement[];
}

export function Layout3ColumnAndFooterWrapper(props: P) {
  return <div className="flex min-h-full flex-col">{props.children}</div>;
}
