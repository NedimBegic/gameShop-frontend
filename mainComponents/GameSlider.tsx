import React, { useState, useEffect } from "react";
import GameCard, { GameCardProps } from "../sideComponents/GameCard"; // Assuming GameCard component is defined in a separate file

const GameSlider: React.FC = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const url =
        "https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "1e6516cebcmsh52887f1a36ded0bp12b703jsn0ba12181f6a2",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();
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
    <div id="gameSlider" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {games.map((game, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <GameCard {...game} />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#gameSlider"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#gameSlider"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default GameSlider;
