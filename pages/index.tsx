import Layout from "@/app/Layout";
import GameSlider from "@/mainComponents/GameSlider";
import style from "./index.module.css";

export default function News() {
  return (
    <Layout>
      <div className={style.articleTitle}>
        <h2>Notable games</h2>
      </div>
      <GameSlider />
    </Layout>
  );
}
