import React, { useState, useEffect } from "react";
import GameCard, { GameCardProps } from "../sideComponents/GameCard";
import style from "./GameSlider.module.css";

const GameSlider: React.FC = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const url =
        "https://free-to-play-games-database.p.rapidapi.com/api/games";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${process.env.GAMES_API}`,
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();
        console.log(data);
        const gamesData: GameCardProps[] = data.map((game: any) => ({
          title: game.title,
          thumbnail: game.thumbnail,
          shortDescription: game.short_description,
          gameUrl: game.game_url,
          genre: game.genre,
          platform: game.platform,
          publisher: game.publisher,
          releaseDate: game.release_date,
        }));
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  interface GameData {
    title: string;
    thumbnail: string;
    short_description: string;
    gameUrl: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    freetogame_profile_url: string;
  }

  const gameData: GameData = {
    title: "Overwatch 2",
    thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
    short_description:
      "A hero-focused first-person team shooter from Blizzard Entertainment.",
    gameUrl: "https://www.freetogame.com/open/overwatch-2",
    genre: "Shooter",
    platform: "PC (Windows)",
    publisher: "Activision Blizzard",
    developer: "Blizzard Entertainment",
    release_date: "2022-10-04",
    freetogame_profile_url: "https://www.freetogame.com/overwatch-2",
  };

  const gameDataArr: GameData[] = Array(10).fill(gameData);

  return (
    <div className={`row ${style.gameSlider}`}>
      <div
        id="gameSlider"
        className={`carousel slide ${style.carousel}`}
        data-ride="carousel"
      >
        <div className={`carousel-inner ${style.carouselInner}`}>
          <div className="row flex-nowrap overflow-auto">
            {gameDataArr.map((game, index) => (
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
