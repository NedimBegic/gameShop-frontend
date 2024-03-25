import React, { useEffect, useState, useContext } from "react";
import style from "./CartButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "@/context/Components";

const CartButton: React.FC = () => {
  const [pulsing, setPulsing] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const { isProductAdded, setIsCart } = useContext(CartContext);

  useEffect(() => {
    const handleStorageChange = () => {
      const cartString = localStorage.getItem("cart");
      if (cartString) {
        const cart = JSON.parse(cartString);
        if (cart.items && cart.items.length > 0) {
          setItemCount(cart.itemCount);
        } else {
          setItemCount(0);
        }
      }
    };

    handleStorageChange();
  }, [isProductAdded]);

  useEffect(() => {
    setPulsing(true);
    const timeout = setTimeout(() => {
      setPulsing(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [itemCount]);

  const toggleCartModule = () => {
    setIsCart((prevState) => !prevState);
  };

  return (
    <div
      className={`d-flex align-items-center ${style.cartButton} ${
        pulsing ? style["pulse-animation"] : ""
      }`}
      onClick={toggleCartModule}
    >
      <div className="me-2">
        <FontAwesomeIcon className={style.icon} icon={faCartShopping} />
      </div>
      <div className={style.itemCount}>{itemCount}</div>
      <div className={"ms-2 " + style.name}>Cart</div>
    </div>
  );
};

export default CartButton;
