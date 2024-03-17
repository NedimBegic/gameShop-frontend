import React, { useState, useEffect } from "react";
import Layout from "@/app/Layout";
import ItemCard from "@/sideComponents/ItemCard";
import style from "./games.module.css";
import { Game } from "@/utils/types";

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames();
  }, [selectedRole]);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "https://gameshop-mh2m.onrender.com/games";
      if (selectedRole) {
        url += `?role=${selectedRole}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const data = await response.json();

      setGames(data.data);
    } catch (error) {
      console.error("Error fetching games:", error);
      setError("Failed to fetch games. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleFilter = (role: string | null) => {
    setSelectedRole(role);
  };

  return (
    <Layout>
      <div className={`row ${style.roleFilter}`}>
        <button
          className="btn btn-primary"
          onClick={() => handleRoleFilter(null)}
        >
          All
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleRoleFilter("rpg")}
        >
          RPG
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleRoleFilter("shooter")}
        >
          Shooter
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleRoleFilter("strategy")}
        >
          Strategy
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleRoleFilter("sport")}
        >
          Sport
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleRoleFilter("action")}
        >
          Action
        </button>
      </div>
      <div className="container">
        <div className={`row ${style.gamesContainer}`}>
          {loading && <div className={style.loading}>Loading...</div>}
          {error && <div className={style.error}>{error}</div>}
          {!loading &&
            !error &&
            games.map((game: Game) => (
              <div className={style.gameDiv} key={game.id}>
                <ItemCard game={game} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
