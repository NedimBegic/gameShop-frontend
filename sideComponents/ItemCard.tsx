import React, { useState, useContext } from "react";
import style from "./ItemCard.module.css";
import { Game } from "@/utils/types";
import Link from "next/link";
import Register from "./Register";
import { CartContext } from "@/context/Components";
import ErrorModule from "@/mainComponents/ErrorModule";

interface Props {
  game: Game;
}

const ItemCard: React.FC<Props> = ({ game }) => {
  const [notLogged, setNotLogged] = useState(false);
  const { setIsProductAdded } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  // Convert the data property to a readable date format
  const formattedDate = new Date(game.date).toLocaleDateString();

  const toggelError = () => {
    setIsAdded((prevState) => !prevState);
  };
  const addToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setNotLogged(true);
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

  const toggleRegister = () => {
    setNotLogged((prevState) => !prevState);
  };

  return (
    <div>
      {notLogged && <Register toggleRegister={toggleRegister} />}
      {isAdded && (
        <ErrorModule
          message="Game is already added to cart"
          toggle={toggelError}
        />
      )}
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
