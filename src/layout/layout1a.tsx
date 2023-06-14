// import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { ReactNode } from "react";

interface P {
  children: ReactNode;
}

export default function Layout1a({ children }: P) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
