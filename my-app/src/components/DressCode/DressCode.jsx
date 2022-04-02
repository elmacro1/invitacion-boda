import React from "react";
import style from "./DressCode.module.css";
import ropa from "./ropa.png";

const DressCode = () => {
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <img src={ropa} alt="ropa" className={style.iconRopa} />
        <h3>Dress Code</h3>
        <span>FORMAL ELEGANTE</span>
      </div>
    </div>
  );
};

export default DressCode;
