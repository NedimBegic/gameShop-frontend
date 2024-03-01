import React, { useState, useEffect } from "react";
import { GameTrilers } from "@/utils/gameTrilers";
import styles from "./Trilers.module.css";

const Trailers: React.FC<{ gameTrailers: GameTrilers[] }> = ({
  gameTrailers,
}) => {
  const [selectedGame, setSelectedGame] = useState<GameTrilers | null>(
    gameTrailers.length > 0 ? gameTrailers[0] : null
  );

  const handleGameClick = (game: GameTrilers) => {
    setSelectedGame(game);
  };

  useEffect(() => {
    setSelectedGame(gameTrailers.length > 0 ? gameTrailers[0] : null);
  }, [gameTrailers]);

  return (
    <div className={styles.main + " " + "container-fluid"}>
      <div className={"row" + " " + styles.content}>
        {/* Left side - Video and name of the selected game */}
        <div className={`col-md-6 ${styles.trailersContainer}`}>
          <div className={styles.videoContainer}>
            <iframe
              width="100%"
              height="315"
              src={selectedGame ? selectedGame.video : ""}
              title={selectedGame ? selectedGame.name : ""}
              allowFullScreen
              frameBorder="0"
            ></iframe>
            <h3>{selectedGame ? selectedGame.name : ""}</h3>
          </div>
        </div>

        {/* Right side - List of other games */}
        <div className={`col-md-6 ${styles.otherGamesContainer}`}>
          <h2>Other Game Trailers</h2>
          <div>
            {gameTrailers.map((gameTrailer, index) => (
              <div
                key={index}
                className={`${styles.gameItem} ${
                  selectedGame === gameTrailer ? styles.selected : ""
                }`}
                onClick={() => handleGameClick(gameTrailer)}
              >
                <img
                  src={gameTrailer.image}
                  alt={gameTrailer.name}
                  className={styles.gameImage}
                />
                <h4>{gameTrailer.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trailers;
