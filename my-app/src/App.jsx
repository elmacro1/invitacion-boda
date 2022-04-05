import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import AddInvited from "./views/AddInvited/AddInvited";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  let [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/gestion"
          element={user ? <AddInvited /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
