// components/Layout.tsx
import React, { ReactNode } from "react";
import Header from "@/mainComponents/Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
