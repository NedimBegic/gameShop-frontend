// ProfilePage.tsx

import { useRouter } from "next/router";
import Layout from "@/app/Layout";
import style from "./nicknames.module.css";
import ItemCard from "@/sideComponents/ItemCard";
import { useEffect, useState } from "react";
import { User } from "@/utils/types";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { nickname } = router.query;

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://gameshop-mh2m.onrender.com/user/${nickname}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (nickname) {
      fetchUserData();
    }
  }, [nickname]);

  return (
    <Layout>
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
          <h2 className={style.gamesTitle}>Games by {userData.nickName}</h2>
          <div className={style.gamesContainer}>
            {userData.games.map((game, index) => {
              const gameWithNickname = {
                ...game,
                nickName: String(nickname || ""),
              };
              return <ItemCard key={index} game={gameWithNickname} />;
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;
