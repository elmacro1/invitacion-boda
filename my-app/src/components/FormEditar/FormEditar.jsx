import React, { useState, useEffect } from "react";
import styles from "./FormEditar.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const FormEditar = ({ reset, invitado }) => {
  let [input, setInput] = useState({
    nombre: "",
    apellido: "",
    id: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateInvited();
    alert("Invitado editado!");
    reset();
  };

  const updateInvited = async () => {
    const invitedRef = doc(db, "invitados", `${invitado.id}`);

    await updateDoc(invitedRef, {
      nombre: input.nombre,
      apellido: input.apellido,
    });
  };

  useEffect(() => {
    setInput({
      nombre: invitado?.nombre,
      apellido: invitado?.apellido,
      id: invitado?.id,
    });
  }, [invitado]);

  return (
    <div className={styles.container__main}>
      <div className={styles.container__content}>
        <h1>Editar</h1>
        <form className={styles.container__form} onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Nombre"
            variant="standard"
            required
            onChange={handleChange}
            name="nombre"
            value={input.nombre}
          />
          <TextField
            id="standard-basic"
            label="Apellido"
            variant="standard"
            required
            onChange={handleChange}
            name="apellido"
            value={input.apellido}
          />

          <Button
            variant="outlined"
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            type="submit"
          >
            Editar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormEditar;
