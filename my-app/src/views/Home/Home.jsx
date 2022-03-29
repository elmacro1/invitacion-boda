import React, { useState } from "react";
import style from "./Home.module.css";
import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import PopUp from "../../components/PopUp/PopUp";
import MapFiesta from "../../components/MapFiesta/MapFiesta";

const Home = () => {
  let [imageSelect, setImageSelect] = useState(null);

  const selectingImage = (image) => {
    setImageSelect(image);
  };

  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <Header />
        <Gallery selectingImage={selectingImage} />
        {imageSelect && (
          <PopUp imageSelect={imageSelect} selectingImage={selectingImage} />
        )}
        <MapFiesta />
      </div>
    </div>
  );
};

export default Home;
