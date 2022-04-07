import React, { useState, useEffect } from "react";
import styles from "./AddInvited.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormAgregar from "../../components/FormAgregar/FormAgregar";
import Button from "@mui/material/Button";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import FormEditar from "../../components/FormEditar/FormEditar";

const AddInvited = () => {
  let [add, setAdd] = useState(false);
  let [edit, setEdit] = useState(false);
  let [columnsInvited, setColumnsInvited] = useState([
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
  ]);
  let [rowsInvited, setRowsInvited] = useState([]);
  let [columnsConfirmed, setColumnsConfirmed] = useState([
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "dni", headerName: "DNI", width: 150 },
    { field: "numero", headerName: "Numero", width: 150 },
    { field: "primeraDosis", headerName: "Primera dosis", width: 150 },
    { field: "segundaDosis", headerName: "Segunda dosis", width: 150 },
  ]);
  let [rowsConfirmed, setRowsConfirmed] = useState([]);
  let [selected, setSelected] = useState(null);
  let [reset, setReset] = useState(false);

  const handleResetInfo = () => {
    setReset(!reset);
    setSelected(null);
    setEdit(false);
    setAdd(false);
  };

  const getInvitados = async () => {
    try {
      let invites = [];
      const querySnapshot = await getDocs(collection(db, "invitados"));
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj = { ...obj, id: doc.id };
        invites.push(obj);
      });
      setRowsInvited(invites);
    } catch (e) {
      console.log("Error al traer los invitados", e);
    }
  };

  const getConfirmados = async () => {
    try {
      let confirmed = [];
      const querySnapshot = await getDocs(collection(db, "confirmados"));
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj = { ...obj, id: doc.id };
        confirmed.push(obj);
      });
      setRowsConfirmed(confirmed);
    } catch (e) {
      console.log("Error al traer los invitados", e);
    }
  };

  const deleteInvited = async () => {
    let opcion = window.confirm(
      "Seguro que quieres borrar al invitado de tu lista?"
    );
    if (opcion) {
      await deleteDoc(doc(db, "invitados", `${selected.id}`));
    }
    handleResetInfo();
  };

  useEffect(() => {
    getInvitados();
    getConfirmados();
  }, [reset]);

  return (
    <div className={styles.container__main}>
      <div className={styles.container__content}>
        <Button variant="outlined" onClick={() => signOut(auth)} color="error">
          Cerrar sesion
        </Button>
        <h1 onClick={() => console.log(selected)}>Gestion de invitados</h1>
        <Button
          variant="outlined"
          onClick={() => setAdd(!add)}
          sx={{ marginBottom: "24px" }}
          color="success"
        >
          Agregar invitado
        </Button>
        {selected && (
          <Button
            variant="outlined"
            sx={{ marginBottom: "24px", marginLeft: "24px" }}
            onClick={() => setEdit(!edit)}
          >
            Editar invitado
          </Button>
        )}
        {selected && (
          <Button
            variant="outlined"
            onClick={() => deleteInvited()}
            sx={{ marginBottom: "24px", marginLeft: "24px" }}
            color="error"
          >
            Borrar invitado
          </Button>
        )}
        {add && <FormAgregar reset={handleResetInfo} />}
        {edit && <FormEditar reset={handleResetInfo} invitado={selected} />}
        <h2>Invitados</h2>
        <span>Hace click en un invitado para editarlo o borrarlo!</span>
        <DataGrid
          rows={rowsInvited && rowsInvited}
          columns={columnsInvited}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={(e) => setSelected(e.row)}
        />
        <h2>Confirmados</h2>
        <DataGrid
          rows={rowsConfirmed && rowsConfirmed}
          columns={columnsConfirmed}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={(e) => setSelected(e.row)}
        />
      </div>
    </div>
  );
};

export default AddInvited;
