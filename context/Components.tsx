import React, { createContext, useState, FC, ReactNode } from "react";

// Define the type for the context value
interface CartContextValue {
  isProductAdded: boolean;
  setIsProductAdded: React.Dispatch<React.SetStateAction<boolean>>;
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>;
  buyedGames: boolean;
  setBuyedGames: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with an initial value
export const CartContext = createContext<CartContextValue>({
  isProductAdded: false,
  setIsProductAdded: () => {},
  isCart: false,
  setIsCart: () => {},
  buyedGames: false,
  setBuyedGames: () => {},
});

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [buyedGames, setBuyedGames] = useState(false);

  // Create the context value object
  const contextValue: CartContextValue = {
    isProductAdded,
    setIsProductAdded,
    isCart,
    setIsCart,
    buyedGames,
    setBuyedGames,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default ProductProvider;
