import React, { useState, useEffect } from "react";
import Layout from "@/app/Layout";
import ItemCard from "@/sideComponents/ItemCard";
import style from "./games.module.css";
import { Game } from "@/utils/types";

export default function Games() {
  const [games, setGames] = useState([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames();
  }, [selectedRole]);

  const fetchGames = async () => {
    setLoading(true); // Set loading to true when fetching data
    setError(null); // Clear any previous errors
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
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleRoleFilter = (role: string | null) => {
    setSelectedRole(role);
  };

  return (
    <Layout>
      <div className={style.roleFilter}>
        <button onClick={() => handleRoleFilter(null)}>All</button>
        <button onClick={() => handleRoleFilter("rpg")}>RPG</button>
        <button onClick={() => handleRoleFilter("shooter")}>Shooter</button>
        <button onClick={() => handleRoleFilter("strategy")}>Strategy</button>
        <button onClick={() => handleRoleFilter("sport")}>Sport</button>
        <button onClick={() => handleRoleFilter("action")}>Action</button>
      </div>
      <div className={style.gamesContainer}>
        {loading && <div className={style.loading}>Loading...</div>}
        {error && <div className={style.error}>{error}</div>}
        {!loading &&
          !error &&
          games.map((game: Game) => <ItemCard key={game.id} game={game} />)}
      </div>
    </Layout>
  );
}
