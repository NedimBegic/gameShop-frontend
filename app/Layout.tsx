import React, { ReactNode, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/mainComponents/Header";
import ProductProvider from "@/context/Components";
import CartModule from "@/sideComponents/CartModule";
import Register from "@/sideComponents/Register";
import AddProduct from "@/sideComponents/AddProduct";
import ErrorModule from "@/mainComponents/ErrorModule";
import { BuyedGames } from "@/utils/types";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [renderCartModule, setRenderCartModule] = useState(false);
  const [renderRegisterModule, setRenderRegisterModule] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState({ isBuyed: false, message: "" });

  const getState = (
    cartState: boolean,
    registerState: boolean,
    loggedState: boolean,
    productState: boolean,
    errorState: BuyedGames
  ) => {
    setRenderCartModule(cartState);
    setRenderRegisterModule(registerState);
    setIsLoggedIn(loggedState), setShowAddProduct(productState);
    setIsError(errorState);
  };

  useEffect(() => {}, [renderRegisterModule]);

  useEffect(() => {
    // Import Bootstrap JavaScript only on the client-side
    import("bootstrap");
  }, []);

  return (
    <ProductProvider>
      <Header getState={getState} />
      {renderCartModule && <CartModule />}
      {renderRegisterModule && !isLoggedIn && <Register />}
      {showAddProduct && <AddProduct />}
      {isError.isBuyed && <ErrorModule message={isError.message} />}
      <main>{children}</main>
    </ProductProvider>
  );
};

export default Layout;
