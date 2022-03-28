import React, { useState } from "react";
import style from "./Gallery.module.css";
import { GaleriaSlider, Slide } from "../GaleriaSlider/GaleriaSlider";
import image1 from "../../images/1.jpeg";
import image2 from "../../images/2.jpeg";
import image3 from "../../images/3.jpeg";
import image4 from "../../images/4.jpeg";
import image5 from "../../images/5.jpeg";
import image6 from "../../images/6.jpeg";
import image7 from "../../images/7.jpeg";
import image8 from "../../images/8.jpeg";
import image9 from "../../images/9.jpeg";
import image10 from "../../images/10.jpeg";

const Gallery = () => {
  let [images, setImages] = useState([
    { img: image1 },
    { img: image2 },
    { img: image3 },
    { img: image4 },
    { img: image5 },
    { img: image6 },
    { img: image7 },
    { img: image8 },
    { img: image9 },
    { img: image10 },
  ]);
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <h3>Nosotros</h3>
        <GaleriaSlider>
          {images.map((image) => (
            <Slide>
              <img
                src={image.img}
                alt="foto slide"
                className={style.image__slide}
              />
            </Slide>
          ))}
        </GaleriaSlider>
      </div>
    </div>
  );
};

export default Gallery;
