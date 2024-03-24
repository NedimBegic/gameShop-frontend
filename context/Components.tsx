import React, { createContext, useState, FC, ReactNode } from "react";

// Define the type for the context value
interface CartContextValue {
  isProductAdded: boolean;
  setIsProductAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with an initial value
export const CartContext = createContext<CartContextValue>({
  isProductAdded: false,
  setIsProductAdded: () => {},
});

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isProductAdded, setIsProductAdded] = useState(false);

  // Create the context value object
  const contextValue: CartContextValue = {
    isProductAdded,
    setIsProductAdded,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default ProductProvider;
