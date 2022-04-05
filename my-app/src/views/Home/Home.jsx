import React, { useState } from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import PopUp from "../../components/PopUp/PopUp";
import MapFiesta from "../../components/MapFiesta/MapFiesta";
import MapIglesia from "../../components/MapIglesia/MapIglesia";
import Countdown from "../../components/Countdown/Countdown";
import DressCode from "../../components/DressCode/DressCode";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let [imageSelect, setImageSelect] = useState(null);
  const navigate = useNavigate();

  const selectingImage = (image) => {
    setImageSelect(image);
  };

  return (
    <div className={styles.container__main}>
      <div className={styles.container__content}>
        <Header />
        <Countdown fechaLimite="May 21 2022 22:00:00 GMT-0300" />
        <Gallery selectingImage={selectingImage} />
        {imageSelect && (
          <PopUp imageSelect={imageSelect} selectingImage={selectingImage} />
        )}
        <MapIglesia />
        <MapFiesta />
        <DressCode />
        <div
          className={styles.container__confirmButton}
          onClick={() => navigate("/confirmarAsistencia")}
        >
          <span className={styles.confirmButton}>Confirmar asistencia</span>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
