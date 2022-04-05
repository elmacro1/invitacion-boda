import React, { useState } from "react";
import styles from "./Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  let [input, setInput] = useState({ username: "", password: "" });
  const handlerChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    loginUser(input.username, input.password);
    console.log(input);
  };

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className={styles.container__main}>
      <div className={styles.container__content}>
        <h1>mibodaom.online</h1>
        <span>Login</span>
        <form className={styles.container__form} onSubmit={handlerSubmit}>
          <TextField
            type="email"
            id="standard-basic"
            label="Email"
            variant="standard"
            name="username"
            onChange={handlerChange}
            value={input.username}
            required
          />
          <TextField
            type="password"
            id="standard-basic"
            label="Password"
            variant="standard"
            name="password"
            onChange={handlerChange}
            value={input.password}
            required
          />
          <Button variant="outlined" type="submit" color="secondary">
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
