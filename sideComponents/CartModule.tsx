import React, { useState, useEffect, useContext } from "react";
import { Game } from "@/utils/types";
import styles from "./CartModule.module.css";
import { CartContext } from "@/context/Components";
import BackgroundBlur from "./BackgroundBlur";

interface Props {}

const CartModule: React.FC<Props> = () => {
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { setIsCart, setIsProductAdded } = useContext(CartContext);

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
    // Logic for buying the games
    console.log("Buying games...");
  };

  return (
    <div>
      <BackgroundBlur toggleFunc={toggleCart} />
      <div className={styles.cartModule}>
        <button onClick={toggleCart} className={styles.x}>
          X
        </button>
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
                  Discard
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
