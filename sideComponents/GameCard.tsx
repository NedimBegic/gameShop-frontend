import React from "react";
import styles from "./GameCard.module.css";

export interface GameCardProps {
  title: string;
  thumbnail: string;
  shortDescription: string;
  gameUrl: string;
  genre: string;
  platform: string;
  publisher: string;
  releaseDate: string;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  thumbnail,
  shortDescription,
  gameUrl,
  genre,
  platform,
  publisher,
  releaseDate,
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
        <p className={`card-text ${styles.cardText}`}>{shortDescription}</p>
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
          {new Date(releaseDate).toLocaleDateString()}
        </p>
        <a
          href={gameUrl}
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
