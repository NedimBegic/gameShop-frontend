import React from "react";
import style from "./ItemCard.module.css";

interface Game {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface Props {
  game: Game;
}

const ItemCard: React.FC<Props> = ({ game }) => {
  return (
    <div className={style.itemCard}>
      <img src={game.image} alt={game.name} className={style.image} />
      <h2 className={style.name}>{game.name}</h2>
      <div className={style.buttons}>
        <button className={`${style.button} ${style.infoButton}`}>
          More Info
        </button>
        <button className={`${style.button} ${style.cartButton}`}>
          Add to Cart
        </button>
      </div>
      <p className={style.price}>${game.price.toFixed(2)}</p>
    </div>
  );
};

export default ItemCard;
