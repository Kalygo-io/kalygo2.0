// import { Footer } from "@/components/shared/footer";
import { Footer } from "@/components/shared/footerV2";
import { Navbar } from "@/components/shared/navbar";
import { NavbarCenteredLogo } from "@/components/shared/navbarCenteredLogo";
import { ReactNode } from "react";

interface P {
  children: ReactNode;
}

export default function Layout1({ children }: P) {
  return (
    <>
      <NavbarCenteredLogo />
      {/* <Navbar /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
}
