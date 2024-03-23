import React from "react";
import style from "./CartButton.module.css";

interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
  return (
    <div className={`d-flex align-items-center ${style.cartButton}`}>
      <div className="me-2">
        <img src="/cart-icon.png" alt="Cart" className={style.cartIcon} />
      </div>
      <div className={style.itemCount}>{itemCount}</div>
      <div className="ms-2">Cart</div>
    </div>
  );
};

export default CartButton;
