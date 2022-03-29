import React, { useEffect, useRef } from "react";
import chevron from "./chevron.svg";
import styled from "styled-components";

const GaleriaSlider = ({ children }) => {
  const slideshow = useRef(null);

  const siguiente = () => {
    //Comprobamos que el slideshow tenga elementos

    if (slideshow.current.children.length > 2) {
      //Obtenemos el primer elemento
      const primerElemento = slideshow.current.children[0];
      //Establecemos la transicion
      slideshow.current.style.transition = `500ms ease-out all`;
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      //Movemos el slideshow
      slideshow.current.style.transform = `translateX(-${tamañoSlide + 16}px)`;

      const transicion = () => {
        //Reiniciamos la posicion del slide
        slideshow.current.style.transition = `none`;
        slideshow.current.style.transform = `translateX(0)`;

        //Tomamos el primer elemento y lo mandamos al final.
        slideshow.current.appendChild(primerElemento);
        slideshow.current.removeEventListener("transitionend", transicion);
      };
      //Eventlistener para cuando termine la animacion.
      slideshow.current.addEventListener("transitionend", transicion);
    }
  };

  const anterior = () => {
    if (slideshow.current.children.length > 0) {
      //Obtenemos el ultimo elemento del slideshow
      const index = slideshow.current.children.length - 1;
      const ultimoElemento = slideshow.current.children[index];
      slideshow.current.insertBefore(
        ultimoElemento,
        slideshow.current.firstChild
      );
      slideshow.current.style.transition = "none";
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamañoSlide + 16}px)`;
      setTimeout(() => {
        slideshow.current.style.transition = `500ms ease-out all`;
        slideshow.current.style.transform = `translateX(0px)`;
      }, 0);
    }
  };

  useEffect(() => {}, []);

  return (
    <ContenedorPrincipal>
      <ContenedorSlideshow ref={slideshow}>{children}</ContenedorSlideshow>
      {children && children.length > 3 ? (
        <>
          <BotonIzquierda onClick={anterior}>
            <img src={chevron} alt="chevron" />
          </BotonIzquierda>
          <BotonDerecha onClick={siguiente}>
            <img src={chevron} alt="chevron" />
          </BotonDerecha>
        </>
      ) : null}
    </ContenedorPrincipal>
  );
};

const ContenedorPrincipal = styled.div`
  position: relative;
  overflow: hidden !important;
`;
const ContenedorSlideshow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 0 16px;
  width: 90%;
`;
const Slide = styled.div`
  transition: 1s ease all;
`;

const BotonIzquierda = styled.div`
  top: 44px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 0px 6px #000000);
`;
const BotonDerecha = styled.div`
  top: 44px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 0px 6px #000000);
`;

export { GaleriaSlider, Slide };
