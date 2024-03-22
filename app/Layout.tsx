import React, { ReactNode, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/mainComponents/Header";
import ProductProvider from "@/context/Components";
type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Import Bootstrap JavaScript only on the client-side
    import("bootstrap");
  }, []);

  return (
    <ProductProvider>
      <Header />
      <main>{children}</main>
    </ProductProvider>
  );
};

export default Layout;
