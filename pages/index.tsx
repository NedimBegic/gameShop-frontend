import Layout from "@/app/Layout";
import style from "./index.module.css";
import GameSlider from "@/mainComponents/GameSlider";
import Trailers from "@/mainComponents/Trilers";
import { gameTrilers } from "@/utils/gameTrilers";
import Heading from "@/sideComponents/Heading";
import Footer from "@/mainComponents/Footer";

export default function News() {
  return (
    <Layout>
      <Heading title={"Notable games"} />
      <GameSlider gameType="any" />
      <Heading title={"Most popular games"} />
      <Trailers gameTrailers={gameTrilers} />
      <Heading title={"Shooters"} />
      <GameSlider gameType="shooter" />
      <Heading title={"Strategy"} />
      <GameSlider gameType={"strategy"} />
      <Footer />
    </Layout>
  );
}
