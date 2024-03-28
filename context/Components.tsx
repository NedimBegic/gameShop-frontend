import React, {
  createContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { BuyedGames } from "@/utils/types";

interface CartContextValue {
  isProductAdded: boolean;
  setIsProductAdded: React.Dispatch<React.SetStateAction<boolean>>;
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>;
  buyedGames: BuyedGames;
  setBuyedGames: React.Dispatch<React.SetStateAction<BuyedGames>>;
  isRegister: boolean;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  showAddProduct: boolean;
  setShowAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartContext = createContext<CartContextValue>({
  isProductAdded: false,
  setIsProductAdded: () => {},
  isCart: false,
  setIsCart: () => {},
  buyedGames: { isBuyed: false, message: "" },
  setBuyedGames: () => {},
  isRegister: false,
  setIsRegister: () => {},
  showAddProduct: false,
  setShowAddProduct: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buyedGames, setBuyedGames] = useState<BuyedGames>({
    isBuyed: false,
    message: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");
    if (token && nickname) {
      setIsLoggedIn(true);
    }
  }, []);

  const contextValue: CartContextValue = {
    isProductAdded,
    setIsProductAdded,
    isCart,
    setIsCart,
    buyedGames,
    setBuyedGames,
    isRegister,
    setIsRegister,
    showAddProduct,
    setShowAddProduct,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default ProductProvider;
