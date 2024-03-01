import React from "react";
import { GameTrilers } from "@/utils/gameTrilers";
import styles from "./Trilers.module.css";

const Trailers: React.FC<{ gameTrailers: GameTrilers[] }> = ({
  gameTrailers,
}) => {
  const otherGames = gameTrailers.slice(1); // Exclude the first game (Cyberpunk 2077)

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left side - Video and name of the first game */}
        <div className={`col-md-6 ${styles.trailersContainer}`}>
          <div className={styles.videoContainer}>
            <iframe
              width="100%"
              height="315"
              src={gameTrailers[0].video}
              title={gameTrailers[0].name}
              allowFullScreen
              frameBorder="0"
            ></iframe>
            <h3>{gameTrailers[0].name}</h3>
          </div>
        </div>

        {/* Right side - List of other games */}
        <div className={`col-md-6 ${styles.otherGamesContainer}`}>
          <h2>Other Game Trailers</h2>
          <div>
            <div className={styles.gameItem}>
              <img
                src={gameTrailers[0].image} // Use the video URL as the image (replace with actual image URL)
                alt={gameTrailers[0].name}
                className="img-fluid mb-2"
              />
              <h4>{gameTrailers[0].name}</h4>
            </div>
            {otherGames.map((gameTrailer, index) => (
              <div key={index} className={styles.gameItem}>
                <img
                  src={gameTrailer.image}
                  alt={gameTrailer.name}
                  className="img-fluid mb-2"
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
