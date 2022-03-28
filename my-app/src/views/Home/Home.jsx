import React from "react";
import style from "./Home.module.css";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <Header />
      </div>
    </div>
  );
};

export default Home;
