import React from "react";
import style from "./Footer.module.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className={style.container__main}>
      <div className={style.container__content}>
        <h2>Nuestras redes sociales</h2>
        <div className={style.container__redes}>
          <div className={style.container__redes_ori}>
            <span>Ori</span>
            <a
              href="https://www.instagram.com/orianacruz6/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon sx={{ color: "#685a72" }} />
            </a>
            <a
              href="https://www.facebook.com/ori.cruz.3"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon sx={{ color: "#685a72" }} />
            </a>
          </div>
          <div className={style.container__redes_marco}>
            <span>Marco</span>
            <a
              href="https://www.instagram.com/marcogalvan98/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon sx={{ color: "#685a72" }} />
            </a>
            <a
              href="https://www.facebook.com/MarcoA.GalvanF"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon sx={{ color: "#685a72" }} />
            </a>
          </div>
        </div>
        <div className={style.container__info}>
          <span onClick={() => navigate("/gestion")}>
            Desarrollado por Marco Galván
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
