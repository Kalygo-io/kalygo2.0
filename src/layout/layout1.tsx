import { Navbar } from "@/components/shared/navbar";
import { ReactNode } from "react";

interface P {
  children: ReactNode;
}

export default function Layout1({ children }: P) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 0, marginTop: 0, top: 0 }}>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
