import React, { ReactNode, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/mainComponents/Header";
import ProductProvider from "@/context/Components";
import { render } from "react-dom";
import CartModule from "@/sideComponents/CartModule";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [renderCartMOdule, setRenderCartModule] = useState(false);

  const getState = (state: boolean) => {
    setRenderCartModule(state);
  };

  useEffect(() => {
    // Import Bootstrap JavaScript only on the client-side
    import("bootstrap");
  }, []);

  return (
    <ProductProvider>
      <Header getState={getState} />
      {renderCartMOdule && <CartModule />}
      <main>{children}</main>
    </ProductProvider>
  );
};

export default Layout;
