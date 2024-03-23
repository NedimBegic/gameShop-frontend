import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/app/Layout";
import style from "./nicknames.module.css";
import ItemCard from "@/sideComponents/ItemCard";
import { User } from "@/utils/types";
import AddProduct from "@/sideComponents/AddProduct";
import ImageUpdate from "@/sideComponents/ImageUpdate";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { nickname } = router.query;
  const [isMy, setIsMy] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [addGame, setAddGame] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MY_BACKEND}/user/${nickname}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); // Set loading state to false when done fetching
      }
    };

    if (nickname) {
      setIsLoading(true); // Set loading state to true before fetching
      fetchUserData();
    }

    const storNickname = localStorage.getItem("nickname");
    if (storNickname === nickname) {
      setIsMy(true);
    }
  }, [nickname]);

  const handleChangePicture = () => {
    setImageChange((prevState) => !prevState);
  };

  const handleAddGame = () => {
    setAddGame((prevState) => !prevState);
  };

  return (
    <Layout>
      {isLoading && (
        <div className={style.loadingContainer}>
          <p> Loading server... (≈ 30 seconds)</p>
        </div>
      )}
      {addGame && <AddProduct toggle={handleAddGame} />}
      {imageChange && <ImageUpdate toggle={handleChangePicture} />}
      {userData && (
        <div className={`${style.profilePage} container`}>
          <div className={style.userDetails}>
            <img
              src={userData.userImageUrl ? userData.userImageUrl : "/games.jpg"}
              alt="User"
              className={style.userImage}
            />
            <h1 className={style.nickname}>{userData.nickName}</h1>
          </div>
          {isMy && (
            <div className={style.buttonsContainer}>
              <button
                className={`${style.button} btn btn-primary mr-2`}
                onClick={handleChangePicture}
              >
                Change Picture
              </button>
              <button
                className={`${style.button} btn btn-primary mr-2`}
                onClick={handleAddGame}
              >
                Add Game
              </button>
            </div>
          )}
          <h2 className={style.gamesTitle}>Games by {userData.nickName}</h2>
          <div className={style.gamesContainer}>
            {userData.games.length < 1 ? (
              <p>{nickname} didn't post any games yet</p>
            ) : (
              userData.games.map((game, index) => {
                const gameWithNickname = {
                  ...game,
                  nickName: String(nickname || ""),
                };
                return <ItemCard key={index} game={gameWithNickname} />;
              })
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;
