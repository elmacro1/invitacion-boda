import React, { useState } from "react";
import styles from "./FormAgregar.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const FormAgregar = ({ reset }) => {
  let [input, setInput] = useState({
    nombre: "",
    apellido: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      await addDoc(collection(db, "invitados"), {
        nombre: input.nombre,
        apellido: input.apellido,
      });
      setInput({
        nombre: "",
        apellido: "",
      });
      reset();
      alert("Invitado agregado!");
    } catch (e) {
      console.log("Error al agregar un invitado nuevo", e);
    }
  };

  return (
    <div className={styles.container__main}>
      <div className={styles.container__content}>
        <h1>Datos del invitado</h1>
        <form className={styles.container__form} onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Nombre"
            variant="standard"
            required
            onChange={handleChange}
            name="nombre"
            value={input.nombre}
            autoComplete="off"
          />
          <TextField
            id="standard-basic"
            label="Apellido"
            variant="standard"
            required
            onChange={handleChange}
            name="apellido"
            value={input.apellido}
            autoComplete="off"
          />

          <Button
            variant="outlined"
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            type="submit"
          >
            Agregar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormAgregar;
