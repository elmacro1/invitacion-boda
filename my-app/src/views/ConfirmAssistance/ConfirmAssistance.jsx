import React, { useState, useEffect } from "react";
import styles from "./ConfirmAssistance.module.css";
import Countdown from "../../components/Countdown/Countdown";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import FormConfirmAssistance from "../../components/FormConfirmAssistance/FormConfirmAssistance";
import { db } from "../../firebase";

const ConfirmAssistance = () => {
  const navigate = useNavigate();
  let [invitados, setInvitados] = useState();

  const getInvitados = async () => {
    try {
      let invites = [];
      const querySnapshot = await getDocs(collection(db, "invitados"));
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj = { ...obj, id: doc.id };
        invites.push(obj);
      });
      setInvitados(invites);
    } catch (e) {
      console.log("Error al traer los invitados", e);
    }
  };

  useEffect(() => {
    getInvitados();
  }, []);

  return (
    <div className={styles.container__main}>
      <div className={styles.container__content}>
        <div
          className={styles.container__volverButton}
          onClick={() => navigate("/")}
        >
          <span className={styles.confirmButton}>Volver</span>
        </div>
        <Countdown fechaLimite="May 10 2022 23:59:00 GMT-0300" confirm={true} />
        <FormConfirmAssistance invitados={invitados} />
      </div>
    </div>
  );
};

export default ConfirmAssistance;
