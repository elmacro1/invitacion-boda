import React from "react";
import style from "./PopUp.module.css";
import close from "./close.svg";

const PopUp = ({ imageSelect, selectingImage }) => {
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <img src={imageSelect} alt="pop up" className={style.imagePopup} />
        <img
          src={close}
          alt="close"
          className={style.close__btn}
          onClick={() => selectingImage(null)}
        />
      </div>
    </div>
  );
};

export default PopUp;
