import React, { useState } from "react";
import style from "./MapFiesta.module.css";
import brindis from "./brindis.png";

const MapFiesta = () => {
  let [showMap, setShowMap] = useState(false);
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <img src={brindis} alt="brindis" className={style.brindis__image} />
        <h3>CELEBRACIÓN</h3>
        <span className={style.nombre}>Sirah Eventos</span>
        <span>La celebración sera el</span>
        <div className={style.container__direccion}>
          <span>21 MAYO</span>
          <div className={style.linea__division}></div>
          <span>10:00 P.M.</span>
        </div>
        <span>La Rioja 1270, Santiago del Estero.</span>
        <span
          className={style.ver_mapa__btn}
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? "Ocultar mapa" : "Ver mapa"}
        </span>
        <iframe
          className={`${style.container__map} ${showMap && style.showMap}`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d441.1560068806536!2d-64.2703140901073!3d-27.802134530177607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943b5275b6838297%3A0xe849ec30967e5!2sSIRAH%20EVENTOS!5e0!3m2!1ses!2sar!4v1648515271525!5m2!1ses!2sar"
          width="600"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="google maps"
        ></iframe>
      </div>
    </div>
  );
};

export default MapFiesta;
