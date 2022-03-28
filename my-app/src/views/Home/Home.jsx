import React from "react";
import style from "./Home.module.css";
import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import PopUp from "../../components/PopUp/PopUp";

const Home = () => {
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <Header />
        <Gallery />
        <PopUp />
      </div>
    </div>
  );
};

export default Home;
