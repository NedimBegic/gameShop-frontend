import React from "react";
import styles from "./GameCard.module.css";
import { GamesInfo } from "@/utils/types";

const GameCard: React.FC<GamesInfo> = ({
  id,
  title,
  thumbnail,
  short_description,
  game_url,
  genre,
  platform,
  publisher,
  developer,
  release_date,
  freetogame_profile_url,
}) => {
  return (
    <div className={`card ${styles.gameCard}`}>
      <img
        src={thumbnail}
        className={`card-img-top ${styles.cardImage}`}
        alt={title}
      />
      <div className={`card-body ${styles.cardBody}`}>
        <h5 className={`card-title ${styles.cardTitle}`}>{title}</h5>
        <p className={`card-text ${styles.cardText}`}>{short_description}</p>
        <p className={`card-info ${styles.cardInfo}`}>
          <strong>Genre:</strong> {genre}
        </p>
        <p className={`card-info ${styles.cardInfo}`}>
          <strong>Platform:</strong> {platform}
        </p>
        <p className={`card-info ${styles.cardInfo}`}>
          <strong>Publisher:</strong> {publisher}
        </p>
        <p className={`card-info ${styles.cardInfo}`}>
          <strong>Release Date:</strong>{" "}
          {new Date(release_date).toLocaleDateString()}
        </p>
        <a
          href={game_url}
          className={`btn btn-primary ${styles.visitButton}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Game
        </a>
      </div>
    </div>
  );
};

export default GameCard;
