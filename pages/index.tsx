import Layout from "@/app/Layout";
import GameSlider from "@/mainComponents/GameSlider";
import Trailers from "@/mainComponents/Trilers";
import style from "./index.module.css";
import { gameTrilers, GameTrilers } from "@/utils/gameTrilers";

export default function News() {
  return (
    <Layout>
      <div className={style.articleTitle}>
        <h2>Notable games</h2>
      </div>
      <GameSlider />
      <Trailers gameTrailers={gameTrilers} />
    </Layout>
  );
}
