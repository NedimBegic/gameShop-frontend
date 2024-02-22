import React, { ReactNode, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/mainComponents/Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Import Bootstrap JavaScript only on the client-side
    import("bootstrap");
  }, []);

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
