import React, { useEffect } from "react";
import Layout from "@/app/Layout";
import GameSlider from "@/mainComponents/GameSlider";
import Trailers from "@/mainComponents/Trilers";
import { gameTrilers } from "@/utils/gameTrilers";
import Heading from "@/sideComponents/Heading";
import Footer from "@/mainComponents/Footer";

export default function News() {
  useEffect(() => {
    // Make a GET request to my backend server endpoint to wake it up
    fetch(`${process.env.NEXT_PUBLIC_MY_BACKEND}/games/5`)
      .then((response) => {
        if (response.ok) {
          console.log("Backend server activated successfully!");
        } else {
          console.error("Failed to activate backend server.");
        }
      })
      .catch((error) => {
        console.error(
          "An error occurred while activating backend server:",
          error
        );
      });
  }, []);

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
