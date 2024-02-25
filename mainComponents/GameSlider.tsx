import React, { useState, useEffect } from "react";
import GameCard, { GameCardProps } from "../sideComponents/GameCard";
import style from "./GameSlider.module.css";

const GameSlider: React.FC = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const url =
        "https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc";
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

  return (
    <div
      id="gameSlider"
      className={`carousel slide ${style.gameSlider}`}
      data-ride="carousel"
    >
      <div className={`carousel-inner ${style.carouselInner}`}>
        {games.map((game, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""} ${
              style.carouselItem
            }`}
          >
            <GameCard {...game} />
          </div>
        ))}
      </div>
      <a
        className={`carousel-control-prev ${style.carouselControlPrev}`}
        href="#gameSlider"
        role="button"
        data-slide="prev"
      >
        <span
          className={`carousel-control-prev-icon ${style.carouselControlIcon}`}
          aria-hidden="true"
        ></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className={`carousel-control-next ${style.carouselControlNext}`}
        href="#gameSlider"
        role="button"
        data-slide="next"
      >
        <span
          className={`carousel-control-next-icon ${style.carouselControlIcon}`}
          aria-hidden="true"
        ></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default GameSlider;
