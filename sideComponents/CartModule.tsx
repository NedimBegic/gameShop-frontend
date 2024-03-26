import React, { useState, useEffect, useContext } from "react";
import { Game } from "@/utils/types";
import styles from "./CartModule.module.css";
import { CartContext } from "@/context/Components";
import BackgroundBlur from "./BackgroundBlur";
import ErrorModule from "@/mainComponents/ErrorModule";

const CartModule: React.FC = () => {
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { setIsCart, setIsProductAdded, setBuyedGames } =
    useContext(CartContext);

  const toggleCart = () => {
    setIsCart((prevState) => !prevState);
  };

  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      const cart = JSON.parse(cartString);
      if (cart.items && cart.items.length > 0) {
        setCartItems(cart.items);
      }
    }
  }, []);

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.price;
    });
    setTotalPrice(sum);
  }, [cartItems]);

  const handleDiscard = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    const updatedCart = { items: newCartItems };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsProductAdded((prevState) => !prevState);
  };

  const handleBuy = () => {
    // Remove cart from localStorage
    localStorage.removeItem("cart");
    setCartItems([]);
    // trigger realod of CartButton component
    setIsProductAdded((prevState) => !prevState);
    // open module to say games are added
    setBuyedGames((prevState) => !prevState);
    // close this component
    toggleCart();
  };

  return (
    <div>
      <BackgroundBlur toggleFunc={toggleCart} />
      <div
        className={`${styles.cartModule} ${
          cartItems.length === 0 ? styles.emptyCartModule : ""
        }`}
      >
        <button onClick={toggleCart} className={styles.x}>
          X
        </button>
        <img className={styles.logo} src="/gameShopWhite.png" alt="logo" />
        <div className={styles.itemsContainer}>
          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className={styles.item}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                </div>
                <button
                  className={styles.discardButton}
                  onClick={() => handleDiscard(index)}
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className={styles.checkoutContainer}>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button className={styles.buyButton} onClick={handleBuy}>
              Buy Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModule;
