import React from "react";
import style from "./MapFiesta.module.css";

const MapFiesta = () => {
  return (
    <div className={style.container__main}>
      <iframe
        className={style.container__map}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d441.1560068806536!2d-64.2703140901073!3d-27.802134530177607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943b5275b6838297%3A0xe849ec30967e5!2sSIRAH%20EVENTOS!5e0!3m2!1ses!2sar!4v1648515271525!5m2!1ses!2sar"
        width="600"
        height="450"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="google maps"
      ></iframe>
    </div>
  );
};

export default MapFiesta;
