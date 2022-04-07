import React, { useState, useEffect } from "react";
import styles from "./FormConfirmAssistance.module.css";
import Button from "@mui/material/Button";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import CloseIcon from "@mui/icons-material/Close";

const FormConfirmAssistance = ({ invitados }) => {
  let [input, setInput] = useState("");
  let [searching, setSearching] = useState(false);
  let [invited, setInvited] = useState();
  let [invitadosShow, setInvitadosShow] = useState();
  let [selected, setSelected] = useState({});
  let [yaConfirmado, setYaConfirmado] = useState(false);

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    console.log(selected);
    confirmarAsistencia();
    setSelected({});
    setInput("");
    setInvitadosShow(invitados);
    alert("Se confirmo asistencia!");
  };

  const handlerChange = (e) => {
    setInput(e.target.value);
    filtrar(e.target.value);
  };

  const handlerChangeSelected = (e) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  const filtrar = (termino) => {
    let resultado = invited?.filter((elem) => {
      let nombreCompleto = `${elem.nombre} ${elem.apellido}`;
      return nombreCompleto.toLowerCase().includes(termino.toLowerCase());
    });
    setInvitadosShow(resultado);
  };

  const confirmarAsistencia = async () => {
    try {
      await setDoc(doc(db, "confirmados", `${selected.id}`), {
        nombre: selected.nombre,
        apellido: selected.apellido,
        dni: selected.dni,
        numero: selected.numero ? selected.numero : "No posee",
        primeraDosis: selected.primeraDosis,
        segundaDosis: selected.segundaDosis,
      });
    } catch (e) {
      console.log("Error al confirmar invitado", e);
    }
  };

  const cleanInput = () => {
    setSelected(null);
    setInput("");
    setYaConfirmado(false);
    setInvitadosShow(invitados);
  };

  const verifConfirmado = async (value) => {
    let confirmados = [];
    const querySnapshot = await getDocs(collection(db, "confirmados"));
    querySnapshot.forEach((doc) => {
      let obj = doc.data();
      obj = { ...obj, id: doc.id };
      confirmados.push(obj);
    });
    let aux = confirmados.find((elem) => elem.id === value);
    aux ? setYaConfirmado(true) : setYaConfirmado(false);
  };

  useEffect(() => {
    setInvited(invitados);
    setInvitadosShow(invitados);
  }, [invitados]);

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
              {selected?.nombre && (
                <CloseIcon
                  sx={{
                    position: "absolute",
                    right: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    cleanInput();
                  }}
                />
              )}

              <input
                id="search"
                placeholder="Ingresa tu nombre y/o apellido"
                onChange={handlerChange}
                onFocus={() => setSearching(true)}
                value={input}
                autoComplete="off"
                required
              />
              {yaConfirmado ? (
                <h3 className={styles.message_error}>
                  Ya confirmaste tu asistencia!
                </h3>
              ) : null}
              {searching && (
                <ul className={styles.container__listado}>
                  {invitadosShow &&
                    invitadosShow.map((elem, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          verifConfirmado(elem.id);
                          setInput(`${elem.nombre} ${elem.apellido}`);
                          setSelected(elem);
                          setSearching(false);
                        }}
                      >{`${elem.nombre} ${elem.apellido}`}</li>
                    ))}
                </ul>
              )}
              {!yaConfirmado && selected?.nombre ? (
                <div className={styles.container__inputs_confirm}>
                  <h3>{`Hola ${selected.nombre}!`}</h3>
                  <div className={styles.container__label_input}>
                    <label htmlFor="dni">Ingresa tu DNI</label>
                    <input
                      type="text"
                      placeholder="Por Ej: 99.999.999"
                      name="dni"
                      id="dni"
                      value={selected.dni}
                      autoComplete="off"
                      onChange={handlerChangeSelected}
                      required
                    />
                  </div>
                  <div className={styles.container__label_input}>
                    <label htmlFor="numero">
                      Ingresa tu número de teléfono
                    </label>
                    <input
                      type="text"
                      placeholder="Por Ej: 385xxxxxxx"
                      name="numero"
                      id="numero"
                      value={selected.numero}
                      autoComplete="off"
                      onChange={handlerChangeSelected}
                    />
                  </div>
                  <div className={styles.container__label_input}>
                    <label htmlFor="primeraDosis">
                      Ingresa que vacuna te colocaste como primera dósis del
                      covid-19
                    </label>
                    <input
                      type="text"
                      placeholder="Por Ej: Sputnik V"
                      name="primeraDosis"
                      id="primeraDosis"
                      value={selected.primeraDosis}
                      autoComplete="off"
                      onChange={handlerChangeSelected}
                      required
                    />
                  </div>
                  <div className={styles.container__label_input}>
                    <label htmlFor="segundaDosis">
                      Ingresa que vacuna te colocaste como segunda dósis del
                      covid-19
                    </label>
                    <input
                      type="text"
                      placeholder="Por Ej: Moderna"
                      name="segundaDosis"
                      id="segundaDosis"
                      value={selected.segundaDosis}
                      autoComplete="off"
                      onChange={handlerChangeSelected}
                      required
                    />
                  </div>
                </div>
              ) : null}
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
