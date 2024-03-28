import React, { useState, useContext } from "react";
import style from "./ItemCard.module.css";
import { Game } from "@/utils/types";
import Link from "next/link";
import { CartContext } from "@/context/Components";
import ErrorModule from "@/mainComponents/ErrorModule";

interface Props {
  game: Game;
}

const ItemCard: React.FC<Props> = ({ game }) => {
  const {
    setIsProductAdded,
    isLoggedIn,
    setIsLoggedIn,
    setIsRegister,
    buyedGames,
    setBuyedGames,
  } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  // Convert the data property to a readable date format
  const formattedDate = new Date(game.date).toLocaleDateString();

  const toggelError = () => {
    setBuyedGames((prevBuyedGames) => ({
      ...prevBuyedGames,
      isBuyed: !prevBuyedGames.isBuyed,
      message: "Game is already added to cart",
    }));
  };
  const addToCart = () => {
    if (!isLoggedIn) {
      setIsRegister((prevState) => !prevState);
      return;
    }

    const gameObj = { ...game };

    // Retrieve cart from localStorage or create a new one if it doesn't exist
    const cartString = localStorage.getItem("cart");
    const cart = cartString ? JSON.parse(cartString) : { items: [] };

    // Check if the game is already in the cart
    const isGameAlreadyAdded = cart.items.some(
      (item: Game) => item.id === gameObj.id
    );

    if (isGameAlreadyAdded) {
      toggelError();
      return;
    }

    // Add gameObj to cart items
    cart.items.push(gameObj);

    // Update itemCount
    cart.itemCount = cart.items.length;

    // Store updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // change state to trigger render of CartButton
    setIsProductAdded((prevState) => !prevState);
  };

  return (
    <div>
      <div className={style.itemCard}>
        <img src={game.image} alt={game.name} className={style.image} />
        <h2 className={style.name}>{game.name}</h2>
        <p className={style.desc}>{game.description}</p>
        <div className={style.info}>
          <span className={style.in}>
            Genre: <span className={style.in2}> {game.role}</span>
          </span>
          <span className={style.in}>
            Posted by:{" "}
            <Link
              href={{
                pathname: `/${game.nickName}`,
              }}
            >
              {game.nickName}
            </Link>
          </span>
          <span className={style.in}>
            Price:<span className={style.in2}> ${game.price.toFixed(2)}</span>
          </span>
          <span className={style.in}>
            Release Date:<span className={style.in2}> {formattedDate}</span>
          </span>
        </div>

        <div className={style.buttons}>
          <button
            className={`${style.button} ${style.cartButton}`}
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
