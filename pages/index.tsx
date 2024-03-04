import Layout from "@/app/Layout";
import style from "./index.module.css";
import GameSlider from "@/mainComponents/GameSlider";
import Trailers from "@/mainComponents/Trilers";
import { gameTrilers, GameTrilers } from "@/utils/gameTrilers";

export default function News() {
  return (
    <Layout>
      <div className={style.articleTitle}>
        <h2>Notable games</h2>
      </div>
      <GameSlider />
      <div className={style.articleTitle}>
        <h2>Best latest games</h2>
      </div>
      <Trailers gameTrailers={gameTrilers} />
    </Layout>
  );
}
