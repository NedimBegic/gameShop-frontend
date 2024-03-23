import React from "react";
import style from "./CartButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
  return (
    <div className={`d-flex align-items-center ${style.cartButton}`}>
      <div className="me-2">
        <FontAwesomeIcon className={style.icon} icon={faCartShopping} />
      </div>
      <div className={style.itemCount}>{itemCount}</div>
      <div className="ms-2">Cart</div>
    </div>
  );
};

export default CartButton;
