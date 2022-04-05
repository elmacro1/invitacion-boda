import React, { useState } from "react";
import styles from "./FormConfirmAssistance.module.css";
import Button from "@mui/material/Button";

const FormConfirmAssistance = ({ invitados }) => {
  let [input, setInput] = useState("");
  let [searching, setSearching] = useState(false);
  let [invited, setInvited] = useState(invitados);
  let [invitadosShow, setInvitadosShow] = useState(invitados);

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };

  const handlerChange = (e) => {
    setInput(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (termino) => {
    let resultado = invited.filter((elem) => {
      let nombreCompleto = `${elem.nombre} ${elem.apellido}`;
      return nombreCompleto.toLowerCase().includes(termino.toLowerCase());
    });
    setInvitadosShow(resultado);
  };

  return (
    <div className={styles.container__main}>
      <div className={styles.container__content}>
        <h2>Confirma tu asistencia!</h2>
        <form className={styles.container__form} onSubmit={handlerSubmit}>
          <label htmlFor="search">
            Busca tu nombre en la lista de invitados
          </label>
          <div className={styles.container__search_list}>
            <div
              className={styles.container__search_result}
              onBlur={(e) =>
                setTimeout(() => {
                  setSearching(false);
                }, 100)
              }
            >
              <input
                id="search"
                placeholder="Ingresa tu nombre y/o apellido"
                onChange={handlerChange}
                onFocus={() => setSearching(true)}
                value={input}
                autoComplete="off"
              />
              {searching && (
                <ul className={styles.container__listado}>
                  {invitadosShow?.map((elem, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setInput(`${elem.nombre} ${elem.apellido}`);
                        setSearching(false);
                      }}
                    >{`${elem.nombre} ${elem.apellido}`}</li>
                  ))}
                </ul>
              )}
            </div>
            <Button variant="outlined" type="submit" color="success">
              Confirmar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormConfirmAssistance;
