import React, { useState, useEffect } from "react";
import GameCard from "../sideComponents/GameCard";
import style from "./GameSlider.module.css";
import { gamesArr } from "@/utils/data";
import { GamesInfo } from "@/utils/types";

interface GameSliderProps {
  gameType: "any" | "shooter" | "strategy";
}

const GameSlider: React.FC<GameSliderProps> = ({ gameType }) => {
  const [randomGames, setRandomGames] = useState<GamesInfo[]>([]);

  // Function to shuffle the array
  const shuffleArray = (array: GamesInfo[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    let filteredGames: GamesInfo[] = gamesArr;
    if (gameType === "shooter") {
      filteredGames = gamesArr.filter((game) => game.genre === "Shooter");
    } else if (gameType === "strategy") {
      filteredGames = gamesArr.filter((game) => game.genre === "Strategy");
    }
    const shuffledGames: GamesInfo[] = shuffleArray(filteredGames);
    const randomGamesSubset = shuffledGames.slice(0, 20);
    setRandomGames(randomGamesSubset);
  }, [gameType]);

  return (
    <div className={`row ${style.gameSlider}`}>
      <div
        id="gameSlider"
        className={`carousel slide ${style.carousel}`}
        data-ride="carousel"
      >
        <div className={`carousel-inner ${style.carouselInner}`}>
          <div className="row flex-nowrap overflow-auto">
            {randomGames.map((game, index) => (
              <div key={index} className={`col-xl-3 ${style.carouselItem}`}>
                <GameCard {...game} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSlider;
