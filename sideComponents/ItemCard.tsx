import React from "react";
import style from "./ItemCard.module.css";
import { Game } from "@/utils/types";

interface Props {
  game: Game;
}

const ItemCard: React.FC<Props> = ({ game }) => {
  // Convert the data property to a readable date format
  const formattedDate = new Date(game.date).toLocaleDateString();

  return (
    <div className={style.itemCard}>
      <img src={game.image} alt={game.name} className={style.image} />
      <h2 className={style.name}>{game.name}</h2>
      <p className={style.desc}>{game.description}</p>
      <div className={style.info}>
        <span className={style.in}>
          Genre: <span className={style.in2}> {game.role}</span>
        </span>
        <span className={style.in}>
          Posted by: <a href={`/${game.nickName}`}>{game.nickName}</a>
        </span>
        <span className={style.in}>
          Price:<span className={style.in2}> ${game.price.toFixed(2)}</span>
        </span>
        <span className={style.in}>
          Release Date:<span className={style.in2}> {formattedDate}</span>
        </span>
      </div>

      <div className={style.buttons}>
        <button className={`${style.button} ${style.cartButton}`}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
