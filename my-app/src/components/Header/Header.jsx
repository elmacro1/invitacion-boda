import React from "react";
import style from "./Header.module.css";
import background from "../../images/16.jpeg";

const Header = () => {
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <img src={background} alt="background" />
        <div className={style.container__text}>
          <h1>Nos casamos</h1>
          <h2>Ori y Marco</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
