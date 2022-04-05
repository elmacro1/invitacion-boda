import React, { useState, useEffect } from "react";
import styles from "./AddInvited.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import FormAgregar from "../../components/FormAgregar/FormAgregar";
import Button from "@mui/material/Button";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const AddInvited = () => {
  let [add, setAdd] = useState(false);
  let [columns, setColumns] = useState([
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
  ]);
  let [rows, setRows] = useState([]);
  let [selected, setSelected] = useState();
  let [reset, setReset] = useState(false);

  const handleResetInfo = () => {
    setReset(!reset);
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
      setRows(invites);
    } catch (e) {
      console.log("Error al traer los invitados", e);
    }
  };

  useEffect(() => {
    getInvitados();
  }, [reset]);

  return (
    <div className={styles.container__main}>
      <div className={styles.container__content}>
        <Button variant="outlined" onClick={() => signOut(auth)}>
          Cerrar sesion
        </Button>
        <h1>Agregar invitado!</h1>
        <Button variant="outlined" onClick={() => setAdd(!add)}>
          Agregar invitado
        </Button>

        {add && <FormAgregar reset={handleResetInfo} />}
        <DataGrid
          rows={rows && rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={(e) => setSelected(e.row)}
        />
      </div>
    </div>
  );
};

export default AddInvited;
