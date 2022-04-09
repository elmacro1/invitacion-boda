import React, { useState, useEffect } from "react";
import styles from "./FormConfirmAssistance.module.css";
import Button from "@mui/material/Button";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const FormConfirmAssistance = ({ invitados }) => {
  let [input, setInput] = useState("");
  let [searching, setSearching] = useState(false);
  let [invited, setInvited] = useState();
  let [invitadosShow, setInvitadosShow] = useState();
  let [selected, setSelected] = useState({});

  const handlerSubmit = (e) => {
    e.preventDefault();
    confirmarAsistencia();
    setSelected({});
    setInput("");
    setInvitadosShow(deleteConfirmado());
    alert("Se confirmo asistencia!");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filtrar(input);
    setSearching(true);
  };

  const deleteConfirmado = () => {
    return invitadosShow.filter((elem) => elem.id !== selected.id);
  };

  const handlerChange = (e) => {
    setInput(e.target.value);
  };

  const handlerChangeSelected = (e) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  const filtrar = (termino) => {
    let terminoAux = termino?.split(" ");
    let resultado = invited?.filter((elem) => {
      let nombreCompleto = `${elem.nombre} ${elem.apellido}`;
      let elemAux;
      terminoAux.forEach((e) => {
        if (nombreCompleto.toLowerCase().includes(e.toLowerCase())) {
          elemAux = elem;
        }
      });
      return elemAux;
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
    setInvitadosShow(invitados);
  };

  const getConfirmados = async () => {
    try {
      let confirmados = [];
      const querySnapshot = await getDocs(collection(db, "confirmados"));
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj = { ...obj, id: doc.id };
        confirmados.push(obj);
      });

      let inviteds = invitados?.filter((i) => {
        let confirmed = false;
        confirmados.forEach((c) => {
          if (c?.id === i?.id) {
            confirmed = true;
          }
        });
        if (confirmed === false) {
          return i;
        }
      });
      setInvited(inviteds);
    } catch (e) {
      console.log("Error al traer los confirmados", e);
    }
  };

  useEffect(() => {
    setInvitadosShow(invitados);
    getConfirmados();
  }, [invitados]);

  const handlerSearchView = () => {
    if (input === "") {
      setSearching(false);
    }
  };

  useEffect(() => {
    handlerSearchView();
  }, [input]);

  return (
    <div className={styles.container__main}>
      <div className={styles.container__content}>
        <h2>Confirma tu asistencia!</h2>
        <form
          className={styles.container__search}
          onSubmit={(e) => input !== "" && handleSearch(e)}
        >
          {selected?.nombre ? (
            <CloseIcon
              sx={{
                position: "absolute",
                right: "8px",
                bottom: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                cleanInput();
              }}
            />
          ) : (
            <IconButton className={styles.container__searchIcon} type="submit">
              <SearchIcon />
            </IconButton>
          )}

          <input
            id="search"
            placeholder="Ingresa tu nombre y/o apellido"
            onChange={handlerChange}
            value={input}
            autoComplete="off"
            required
          />
        </form>
        <form className={styles.container__form} onSubmit={handlerSubmit}>
          <div className={styles.container__search_list}>
            <div className={styles.container__search_result}>
              {searching === true && input ? (
                <ul className={styles.container__listado}>
                  {invitadosShow.length > 0 ? (
                    invitadosShow.map((elem, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setInput(`${elem.nombre} ${elem.apellido}`);
                          setSelected(elem);
                          setSearching(false);
                        }}
                      >{`${elem.nombre} ${elem.apellido}`}</li>
                    ))
                  ) : (
                    <span>
                      No existe este invitado en la lista o ya confirmo su
                      asistencia
                    </span>
                  )}
                </ul>
              ) : null}
              {selected?.nombre ? (
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
            {selected?.nombre && (
              <Button variant="outlined" type="submit" color="success">
                Confirmar
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormConfirmAssistance;
