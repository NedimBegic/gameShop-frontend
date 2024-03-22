import React, { createContext, useState, FC, ReactNode } from "react";

export const ComponentContext = createContext({});

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const toggleAddProduct = () => {
    setShowAddProduct((prevState) => !prevState);
  };

  const ctx = {
    showAddProduct,
    toggleAddProduct,
  };

  return (
    <ComponentContext.Provider value={ctx}>
      {children}
    </ComponentContext.Provider>
  );
};

export default ProductProvider;
