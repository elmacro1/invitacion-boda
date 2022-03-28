import React from "react";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <h1>Marco y Ori</h1>
      </div>
    </div>
  );
};

export default Header;
