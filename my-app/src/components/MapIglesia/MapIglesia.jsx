import React, { useState } from "react";
import style from "./MapIglesia.module.css";
import anillos from "./anillos-de-boda.png";
import close from "./close.svg";

const MapIglesia = () => {
  let [showMap, setShowMap] = useState(false);
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <img src={anillos} alt="anillos" className={style.anillos__image} />
        <h3>CEREMONIA</h3>
        <span className={style.nombre}>Parroquia San Juan Diego</span>
        <span>La ceremonia sera el</span>
        <div className={style.container__direccion}>
          <span>21 MAYO</span>
          <div className={style.linea__division}></div>
          <span>9:30 P.M.</span>
        </div>
        <span>Av. San Patricio, Santiago del Estero.</span>

        <span
          className={style.ver_mapa__btn}
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? "Ocultar mapa" : "Ver mapa"}
        </span>

        <iframe
          className={`${style.container__map} ${showMap && style.showMap}`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1763.9070781580945!2d-64.25730212207439!3d-27.846250342099612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943b4c32c082616d%3A0xabbf92f2072412f0!2sParroquia%20San%20Juan%20Diego!5e0!3m2!1ses!2sar!4v1648557299777!5m2!1ses!2sar"
          width="600"
          height="450"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="google maps"
        ></iframe>
      </div>
    </div>
  );
};
export default MapIglesia;
