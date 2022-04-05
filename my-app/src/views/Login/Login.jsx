import React, { useState } from "react";
import styles from "./Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const Login = () => {
  let [input, setInput] = useState({ username: "", password: "" });
  let [error, setError] = useState(false);
  let [logged, setLogged] = useState(false);
  const handlerChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    validate();
    console.log(input);
  };

  const validate = () => {
    if (input.username === "") {
      setError(true);
      setLogged(false);
    } else {
      setError(false);
      setLogged(true);
    }
    if (input.password === "") {
      setError(true);
      setLogged(false);
    } else {
      setError(false);
      setLogged(true);
    }
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
          />
          <TextField
            type="password"
            id="standard-basic"
            label="Password"
            variant="standard"
            name="password"
            onChange={handlerChange}
            value={input.password}
            hiddenLabel
          />
          <Button variant="outlined" type="submit" color="secondary">
            Ingresar
          </Button>
        </form>
        {error && <Alert severity="error">Email y/o clave incorrecta!</Alert>}
        {logged && <Alert severity="success">Logueado!!!</Alert>}
      </div>
    </div>
  );
};

export default Login;
